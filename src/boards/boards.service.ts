import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
    constructor(
      private boardRepository:BoardRepository
    ) {
    }

    //createBoard 하는걸 기다려야하지않나?..
    createBoard( createBoardDto:CreateBoardDto ){
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOneBy({id: id});

        if(!found){
            throw new NotFoundException(`can't find board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number){
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0 ){
            throw new NotFoundException(`can't find board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus) {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //
    //     this.boards.push(board);
    //     return board;
    // }
    //
    //
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //
    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //
    //     return found;
    // }
    //
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    //
    //
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
