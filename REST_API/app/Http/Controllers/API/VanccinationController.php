<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\VaccinationResource;
use App\Http\Resources\VaccineResource;
use App\Models\Vaccination;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VanccinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $first = null;
        $second = null;
        if ($request->user()->vaccination->where('dose', 2)->count() > 0) {
            $secondDose = $request->user()->vaccination->where('dose', 2)->first();
            $queue2nd = Vaccination::where('spot_id', $secondDose->spot_id)->where('date', $secondDose->date)->where('id', '<', $secondDose->id)->count();
            $second = new VaccinationResource($request->user()->vaccination->where('dose', 2)->first());
            $second['queue'] = $queue2nd + 1;
        }
        if ($request->user()->vaccination->where('dose', 1)->count() > 0) {
            $firstDose = $request->user()->vaccination->where('dose', 1)->first();
            $queue = Vaccination::where('spot_id', $firstDose->spot_id)->where('date', $firstDose->date)->where('id', '<', $firstDose->id)->count();
            $first = new VaccinationResource($request->user()->vaccination->where('dose', 1)->first());
            $first['queue'] = $queue + 1;
        }

        // return $queue + 1;

        return response()->json([
            'vaccinations' => [
                'first' => $first,
                'second' => $second
            ]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'date_format:Y-m-d',
            'spot_id' => 'required'
        ], [
            'date.date_format' => 'The date does not match the format Y-m-d.',
        ]);
        if ($request->user()->consultation->status != 'accepted') {
            return response()->json([
                'message' => 'Your consultation must be accepted by doctor before'
            ], 401);
        }

        if ($request->user()->vaccination->count() > 0) {
            if (!$request->user()->vaccination->where('dose', 1)->where('date', '<', Carbon::createFromFormat('Y-m-d', $request->date)->subDays(30))->count() > 0) {
                return response()->json([
                    'message' => 'Wait at least +30 days from 1st Vaccination'
                ], 401);
            } else {
                $validated['dose'] = 2;
            }
        }

        if ($request->user()->vaccination->count() > 2) {
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        }

        $vaccination = $request->user()->vaccination()->create($validated);
        $message = Vaccination::where('society_id', $request->user()->id)->count() > 1 ? 'Second vaccination registered successful' : 'first vaccination registered successful';
        if ($vaccination) {
            return response()->json([
                'message' => $message,
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
