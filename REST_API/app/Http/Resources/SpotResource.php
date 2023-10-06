<?php

namespace App\Http\Resources;

use App\Models\Vaccine;
use Illuminate\Http\Resources\Json\JsonResource;

class SpotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;
    public function toArray($request)
    {    
        $avaible_vaccines = [];
        $allVaccines = Vaccine::all();
        foreach ($allVaccines as $vaccine) {
            $avaible_vaccines[$vaccine->name] = false ;

        }
        foreach ($allVaccines as $vaccine) {
            foreach ($this->vaccines as $spotVaccine) {
                if ($vaccine->name == $spotVaccine->name) $avaible_vaccines[$vaccine->name] = true ;
            }
        }
       

        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'serve' => $this->serve,
            'capacity' => $this->capacity,
            'avaible_vaccines' => $avaible_vaccines,
        ];
    }
}
