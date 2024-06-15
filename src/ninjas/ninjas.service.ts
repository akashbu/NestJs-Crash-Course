import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { get } from 'http';

@Injectable()
export class NinjasService {

    private ninjas = [{
        id: 0, name: 'Akash', weapon:'stars'
    },{
        id:1, name: 'Abhi', weapon: 'nunchunks'
    }]

    getNinjas(weapon?: 'stars'|'nunchunks'){
        if(weapon){
            return this.ninjas.filter((ninja) => ninja.weapon === weapon)
        }

        return this.ninjas
    }

    getNinja(id: number){
        const ninja = this.ninjas.find((ninja)=> ninja.id === id)

        if(!ninja){
            throw new Error('Ninja not found')
        }

        return ninja
    }

    createNinja(createNinja: CreateNinjaDto){
        const newNinja = {
            ...createNinja,
            id: Date.now()
        }
        this.ninjas.push(newNinja)

        return newNinja
    }

    updateNinja(id:number, updateNinja:UpdateNinjaDto){
        this.ninjas = this.ninjas.map((ninja)=>{
            if(ninja.id === id){
                return {...ninja, ...updateNinja}
            }
            return ninja
        })

        return this.getNinja(id)
    }

    removeNinja(id:number){
        const removed = this.getNinja(id)
        this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id)  
        return removed
    }
}
