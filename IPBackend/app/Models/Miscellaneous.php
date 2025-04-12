<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Miscellaneous extends Model
{
    use HasFactory;
    protected $table = 'miscellaneous';
    protected $fillable = ['user_id','misc_name','misc_budget'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
