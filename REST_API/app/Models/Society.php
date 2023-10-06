<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Society extends Authenticatable
{
    use HasFactory,HasApiTokens,Notifiable;

    protected $hidden = [
        'password',
        'id_card_number',
        'login_tokens',
        'id',
        'regional_id'
    ];
    protected $fillable = [
        'id_card_number',
        'password',
        'name',
        'bord_date',
        'gender',
        'address'
    ];

    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }

    public function consultation()
    {
        return $this->hasOne(Consultation::class);
    }

    public function vaccination()
    {
        return $this->hasMany(Vaccination::class);
    }
}
