<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $hidden = [
        'pivot'
    ];

    public function spot()
    {
        return $this->belongsToMany(Spot::class, 'spot_vaccines');
    }
}
