<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
           /*  $table->unsignedBigInteger('user_id'); */
            $table->string('product_name', 50);
            $table->decimal('product_price', 5,2);
            $table->integer('product_quantity');
            $table->integer('sales_volume');
            $table->tinyInteger('archived')->default(0);
            $table->timestamps();

            /* $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade'); */

        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
