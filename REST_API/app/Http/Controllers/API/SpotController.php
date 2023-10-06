<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpotResource;
use Illuminate\Http\Request;
use App\Models\Spot;

class SpotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return SpotResource::collection($request->user()->regional->spots);
        return response()->json([
            'spots' => SpotResource::collection($request->user()->regional->spots)
        ], 200);
        // return $request->user()->regional->spots;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Spot $spot, Request $request)
    {
        $date = $request->date ? date('F d, Y',strtotime($request->date)) : now()->format('F d, Y');
        $vaccination_count = $spot->vaccinations()->where('date', date('Y-m-d', strtotime($date)))->count() ;

        return response()->json([
            'date' => $date,
            'spot' => $spot,
            'vaccination_count' => $vaccination_count,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
