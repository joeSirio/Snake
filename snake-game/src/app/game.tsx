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
        // setup grid
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

        // set snake start position
        grid.find(x => x.id === 12)!.active = true;
        grid.find(x => x.id === 13)!.active = true;
        grid.find(x => x.id === 14)!.active = true;

        // update grid state
        setGrid(grid);

        // set snake info
        let snake: ISnake = {
            headId: 12,
            segmentIds: [12,13,14],
            length: 3
        }
        // update snake state
        setSnake(snake);
      }, []);

    function handleTileClick(tile: ITile){
        // handle tile click and move snake
        let snakeHeadTile = grid.find(x => x.id === snake!.headId);
        console.log("*********** tile click *********")
        console.log(snakeHeadTile)
        console.log(tile)

        // check if click was valid for snake to move
        if((Math.abs(snakeHeadTile!.x - tile.x) === 1 && Math.abs(snakeHeadTile!.y - tile.y) === 0) ||
            (Math.abs(snakeHeadTile!.x - tile.x) === 0 && Math.abs(snakeHeadTile!.y - tile.y) === 1))
        {
            // check if snake segment was clicked (which is an invalid move)
            if(snake!.segmentIds.indexOf(tile.id) !== -1){
                console.log('invalid')
                return;
            }

            // create new grid to update grid state
            let newGrid = grid;
            // set last segment piece on grid to false, essentailly remove last segment from snake on grid
            newGrid.find(x => x.id === snake!.segmentIds[snake!.length - 1])!.active = false;
            
            // update snake object with new headId and segment array
            let updatedSegments: number[] = snake!.segmentIds;
            updatedSegments?.pop();
            let newSnake :ISnake = {
                headId: tile.id,
                segmentIds: [tile.id, ...updatedSegments],
                length: 3
            }
            setSnake(newSnake);

            // update grid to show new head of snake
            newGrid.find(x => x.id === tile.id)!.active = true;
            setGrid([...newGrid])
        }
    }
    

    return (
     <div className="game-wrapper" style={{width: width, height: height}}>
        {grid.map(tile => (
            <Tile key={tile.id} 
                tileWidth={tileWidth} 
                tileHeight={tileHeight} 
                handleTileClick={handleTileClick} 
                tile={tile} 
                snakeHeadId={snake?.headId} />
        ))}
     </div>
    )
  }