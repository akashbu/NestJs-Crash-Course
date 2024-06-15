import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaservice: NinjasService){}

    @Get()
    getNinjas(@Query('weapon') weap:'stars'|'nunchunks') {
        return this.ninjaservice.getNinjas(weap);
    }

    @Get(':id')
    getOneNinjas(@Param('id', ParseIntPipe) id:number) {
        return this.ninjaservice.getNinja(id)
    }

    @Post()
    createNinja(@Body(new ValidationPipe()) createNinja: CreateNinjaDto){
        return this.ninjaservice.createNinja(createNinja)
    }

    @Put(':id')
    updateNinja(@Param('id', ParseIntPipe) id: number, @Body() updateNinja: UpdateNinjaDto){
        return this.ninjaservice.updateNinja(id, updateNinja)
    }

    @Delete(':id')
    removeNinja(@Param('id', ParseIntPipe) id:number){
        return this.ninjaservice.removeNinja(id)
    }
}
