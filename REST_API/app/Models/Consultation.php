<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'disease_history',
        'current_symptoms'
    ];

    public function society()
    {
        return $this->belongsTo(Society::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
