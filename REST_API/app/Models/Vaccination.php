<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'date',
        'society_id',
        'dose',
        'spot_id'
    ];

    public function spot()
    {
        return $this->belongsTo(Spot::class);
    }
}
