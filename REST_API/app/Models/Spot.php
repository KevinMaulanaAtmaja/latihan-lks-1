<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    use HasFactory;

    protected $hidden = [
        'pivot',
        'regional_id'
    ];

    

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }

    public function vaccines()
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccines');
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }
}
