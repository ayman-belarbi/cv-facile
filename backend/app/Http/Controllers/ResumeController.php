<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()->resumes()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'data' => 'required|array',
        ]);
        $resume = Auth::user()->resumes()->create([
            'title' => $request->title,
            'data' => json_encode($request->data),
        ]);
        return response()->json($resume, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $resume = Auth::user()->resumes()->findOrFail($id);
        return response()->json($resume);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $resume = Auth::user()->resumes()->findOrFail($id);
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'data' => 'sometimes|array',
        ]);
        if ($request->has('title')) $resume->title = $request->title;
        if ($request->has('data')) $resume->data = json_encode($request->data);
        $resume->save();
        return response()->json($resume);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resume = Auth::user()->resumes()->findOrFail($id);
        $resume->delete();
        return response()->json(['message' => 'Resume deleted']);
    }
}
