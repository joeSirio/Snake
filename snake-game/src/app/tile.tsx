import { useState } from "react";


export default function Tile(props: any) {

    function handleTileClick(){
        props.handleTileClick(props.tile);
    }

    return (
        <div className={`tile ${props.tile.active ? "active" : ""} 
                ${props.snakeHeadId === props.tile.id ? "snakeHead" : ""}
                ${props.tile.food ? "food" : ""}
            `} 
            style={{width: props.tileWidth, height: props.tileHeight}}
            data-id={props.tile.id}
            onClick={handleTileClick}>
        </div>
    )
}