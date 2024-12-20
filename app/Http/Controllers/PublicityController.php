<?php

namespace App\Http\Controllers;

use App\Models\Publicity;
use Illuminate\Http\Request;

class PublicityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $details = Publicity::all();
        return response()->json($details);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'url' => 'required',
        ]);

        $detail = Publicity::create($validated);

        return response()->json($detail, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pub = Publicity::findOrFail($id);
        return response()->json([
            $pub
        ] 
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publicity $publicity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $pub)
    {
        $request->validate([
            'title' => 'required',
            'url' => 'required',
        ]);

        $pub = Publicity::findOrFail($pub);
        $pub-> title = $request['title'];
        $pub-> url = $request['url'];
        $pub-> save();

        return response()->json([
            'Message' => 'Data already updated.',
            'Publicity: ' => $pub
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pub = Publicity::findOrFail($id);
        $pub -> delete();

        return response()->json([
            'Message' => 'Publicity deleted successfully.'
        ]);
    }
}
