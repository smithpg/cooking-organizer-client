const fs = require("fs");
console.log(process.argv);
const targetDir = process.argv[2] || "./";

if (!(targetDir.endsWith("/") || targetDir.endsWith("\\"))) {
  targetDir += "/";
}

/**
 * Iterate through contents of current dir. For each file that ends in ".js",
 * we want to check whether a corresponding .module.scss file already exists. If it does, move both files
 * into a new subdir. Otherwise, create the module file and write contents of style template string
 * into it. Then remove styled-components code from .js file.
 *
 */

// let splitOnDot, styleModulePath, newDirPath;
// fs.readdir(targetDir, (err, files) => {
//   if (err) console.log(err);
//   else {
//     files.forEach(file => {
//       if (file.endsWith(".js")) {
//         // Read file into memory
//         let jsFileContents = fs.readFileSync(targetDir + file, "utf-8");
//         // Make the new directory
//         splitOnDot = file.split(".");
//         newDirPath = targetDir + splitOnDot[0];
//         fs.mkdirSync(newDirPath);

//         // Check for existence of corresponding scss module file
//         const styleModuleOrigPath = targetDir + splitOnDot[0] + ".module.scss",
//           styleModuleDestPath = `${targetDir + splitOnDot[0]}/${
//             splitOnDot[0]
//           }.module.scss`;
//         if (fs.existsSync(styleModuleOrigPath)) {
//           // if it exists, move it to the new dir
//           try {
//             fs.renameSync(styleModuleOrigPath, styleModuleDestPath);
//           } catch (err) {
//             console.log(err);
//           }
//         } else {
//           // Create the style module file, and optimistically populate it w/ contents
//           // of styled-components template string

//           let matches = jsFileContents.match(
//             /const (\S+) [^\n]+styled\.(.*)`([^`]+)`/
//           );
//           console.log(matches);
//           if (matches) {
//             // If a styledComponents template string was found
//             let styledComponentVarName = matches[1],
//               styledComponentTagType = matches[2],
//               templateStringContents = matches[3],
//               className =
//                 splitOnDot[0].slice(0, 1).toUpperCase() +
//                 splitOnDot[0].slice(1);

//             fs.writeFileSync(
//               styleModuleDestPath,
//               `@import "../styles/mixins";\n.${className} {${templateStringContents}}`,
//               "utf8"
//             );

//             // Delete styled components code from original .js file
//             fs.writeFileSync(
//               targetDir + file,
//               jsFileContents
//                 .replace(
//                   /^.*styled-components.*$/m,
//                   `import styles from "./${splitOnDot[0]}.module.scss";`
//                 )
//                 .replace(/const (\S+) [^\n]+styled\.(.*)`([^`]+)`/, "")
//                 .replace(
//                   new RegExp(`<${styledComponentVarName}>`, "g"),
//                   `<${styledComponentTagType} className= {styles.${className}}>`
//                 )
//                 .replace(
//                   new RegExp(`</${styledComponentVarName}>`, "g"),
//                   `</${styledComponentTagType}>`
//                 )
//             );
//           } else {
//           }
//         }

//         fs.renameSync(targetDir + file, newDirPath + "/" + file);
//       }
//     });
//   }
// });

let fileName, styleModulePath, newDirPath;
fs.readdir(targetDir, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach(file => {
      if (file.endsWith(".js")) {
        // Read file into memory
        let jsFileContents = fs.readFileSync(targetDir + file, "utf-8");
        // Make the new directory
        fileName = file.split(".")[0]; // ASSUMES NO FILE NAMES LIKE : "multi.part.name.js"

        // Check for existence of corresponding scss module file
        const styleModuleOrigPath = targetDir + fileName + ".module.scss";
        if (!fs.existsSync(styleModuleOrigPath)) {
          // Create the style module file, and optimistically populate it w/ contents
          // of styled-components template string

          let matches = jsFileContents.match(
              /const (\S+) [^\n]+styled\.(.*)`([^`]+)`/
            ),
            className = fileName.slice(0, 1).toUpperCase() + fileName.slice(1),
            templateStringContents = "";

          if (matches) {
            // If a styledComponents template string was found
            let styledComponentVarName = matches[1],
              styledComponentTagType = matches[2];

            templateStringContents = matches[3];

            // Delete styled components code from original .js file
            fs.writeFileSync(
              targetDir + file,
              jsFileContents
                .replace(
                  /^.*styled-components.*$/m,
                  `import styles from "./${fileName}.module.scss";`
                )
                .replace(/const (\S+) [^\n]+styled\.(.*)`([^`]+)`/, "")
                .replace(
                  new RegExp(`<${styledComponentVarName}([^>]*)>`, "g"),
                  `<${styledComponentTagType} className= {styles.${className}} $1>`
                )
                .replace(
                  new RegExp(`</${styledComponentVarName}>`, "g"),
                  `</${styledComponentTagType}>`
                )
            );
          }

          fs.writeFileSync(
            styleModuleOrigPath,
            `@import "../styles/mixins";\n.${className} {${templateStringContents}}`,
            "utf8"
          );
        }
      }
    });
  }
});

// let jsFileContents = fs.readFileSync(`${targetDir}landing.js`, "utf-8");
// let matches = jsFileContents.match(/const (\S+) [^\n]+styled\.(.*)`([^`]+)`/);
// console.log(matches);
// console.dir(matches);
