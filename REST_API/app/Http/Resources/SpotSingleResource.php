<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SpotSingleResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'capacity' => $this->capacity,
            'serve' => $this->serve,
            'regional' => [
                'id' => $this->regional->id,
                'province' => $this->regional->province,
                'district' => $this->regional->district
            ]
        ];
    }
}
