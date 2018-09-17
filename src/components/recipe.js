import React, { Component } from 'react';
import styled from "styled-components"

const Style = styled.div`

    div{

    }

    h1{
        display: inline;
        font-size: 1.2rem;
        margin: 1rem;
    }

    button{

    }

    .delete{

    }

    .edit{

    }

    .ingredient{

    }
`


const Recipe = ({recipe, triggerEdit, handleDelete, setHover}) => (
    <Style onMouseEnter={setHover.bind(null, recipe)} onMouseLeave={setHover.bind(null, null)}>
        <div>
            <h1>{recipe.title}</h1>
            <button className="delete" onClick={() => handleDelete(recipe.id)}>Delete</button>
            <button className="edit" onClick={triggerEdit.bind(null, recipe.id)}>Edit</button>
        </div>
        
        <ol>
        {
            recipe.ingredients.map(ingredient => (
            <li className="ingredient">{ingredient}</li>    
            ))
        }
        </ol>
    </Style>
)
 
export default Recipe;