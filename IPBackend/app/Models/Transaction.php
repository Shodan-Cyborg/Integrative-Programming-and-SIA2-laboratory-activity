<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';
    protected $fillable = [
        'transaction-date',
        'payment',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Products()
    {
        return $this->belongsTo(Products::class);
    }

    public function Services()
    {
        return $this->belongsTo(Services::class);
    }
}
