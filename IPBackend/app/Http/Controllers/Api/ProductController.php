<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function display()
    {
        $products = Products::where("status", 1)->get();
        return response()->json([
            "products" => $products,
        ]);
    }

    public function store(Request $request)
    {
        $products = new Products();

        $products->product_name     = $request->input("product_name");
        $products->product_price    = $request->input("product_price");
        $products->product_quantity = $request->input("product_quantity");
        $products->sales_volume     = $request->input("sales_volume");

        $products->save();

        return response()->json([
            "status"  => 200,
            "message" => "Products Added Successfully",
        ]);

    }

    public function fetch()
    {
        $products = Products::where("archived", 0)->get();
        return response()->json([
            "products" => $products,
        ]);
    }

    public function edit($product_id)
    {
        $products = Products::find($product_id);
        if ($products) {
            return response()->json([
                "status"   => 200,
                "products" => $products,
            ]);
        }
    }

    public function update(Request $request, int $product_id)
    {
        $products                   = Products::find($product_id);
        $products->product_name     = $request->input("product_name");
        $products->product_price    = $request->input("product_price");
        $products->product_quantity = $request->input("product_quantity");
        $products->sales_volume     = $request->input("sales_volume");
        $products->save();
    }

    public function delete($product_id)
    {
        $products           = Products::find($product_id);
        $products->archived = 1;
        $products->save();
    }

    public function search(Request $request)
{
    $products = $request->input('search');
    $result = Products::where('product_name', 'like', "%{$products}%")
                      ->orWhere('product_price', 'like', "%{$products}%")
                      ->orWhere('product_quantity', 'like', "%{$products}%")
                      ->orWhere('sales_volume', 'like', "%{$products}%")
                      ->get();

    return response()->json([
        'searchList' => $result,
        'message'      => "search successful",
    ]);
}

}
