"use client"

import { useEffect, useState } from "react";
import Tile from "./tile";
import ISnake from "../interfaces/snake";
import ITile from "../interfaces/tile";

export default function Game() {
    const width = 800;
    const height = 600;
    const tilesX = 8;
    const tilesY = 8;
    const tileWidth = width/tilesX;
    const tileHeight = height/tilesY;
    const [grid, setGrid] = useState<ITile[]>([])
    const [snake, setSnake] = useState<ISnake>()

    useEffect(() => {
        let grid = [];
        let id = 1;
        for(let x = 0; x < tilesX; x++){
            for(let y = 0; y < tilesY; y++){
                let tile : ITile = {
                    id: id,
                    x: x,
                    y: y,
                    active: false
                };
                grid.push(tile)
                id++;
            }
        }
        setGrid(grid);
      }, []);

    function handleTileClick(tile){
        console.log('clicked')
        let newGrid = grid;
        newGrid.find(x => x.id === tile.id).active = true;
        console.log(newGrid.find(x => x.id === tile.id))
        setGrid([...newGrid])
    }
    

    return (
     <div className="game-wrapper" style={{width: width, height: height}}>
        {grid.map(tile => (
            <Tile key={tile.id} tileWidth={tileWidth} tileHeight={tileHeight} handleTileClick={handleTileClick} tile={tile} />
        ))}
     </div>
    )
  }