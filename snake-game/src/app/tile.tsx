import { useState } from "react";


export default function Tile(props: any) {

    function handleTileClick(){
        props.handleTileClick(props.tile);
    }

    return (
        <div className={`tile ${props.tile.active ? "active" : ""}`} style={{width: props.tileWidth, height: props.tileHeight, border: "1px solid #fff", display: "inline-block"}}
            onClick={handleTileClick}>
        </div>
    )
}