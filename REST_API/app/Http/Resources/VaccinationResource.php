<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'queue' => $this->queue,
            'dose' => $this->dose,
            'vaccination_date' => $this->date,
            'spot' => new SpotSingleResource($this->spot),
        ];
    }
}
