<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SurveyQuestionAnswer; // Asegúrate de que este modelo existe y apunta a la tabla survey_question_answers

class SurveyQuestionAnswerController extends Controller
{
    // Método para obtener todas las respuestas
    public function index()
    {
        // Obtiene todas las respuestas sin filtrar por "deleted_at"
        $answers = SurveyQuestionAnswer::all();
        return response()->json($answers);
    }

    // Método para almacenar una nueva respuesta
    public function store(Request $request)
    {
        // Valida los datos recibidos
        $request->validate([
            'survey_question_id' => 'required|integer',
            'survey_answer_id' => 'required|integer',
            'answer' => 'required|string|max:255',
        ]);

        // Crea una nueva respuesta
        $answer = new SurveyQuestionAnswer();
        $answer->survey_question_id = $request->input('survey_question_id');
        $answer->survey_answer_id = $request->input('survey_answer_id');
        $answer->answer = $request->input('answer');
        $answer->created_at = now();
        $answer->save();

        // Devuelve la respuesta recién creada
        return response()->json($answer, 201);
    }

    // Método para actualizar una respuesta existente
    public function update(Request $request, $id)
    {
        // Buscar el registro por ID
        $answer = SurveyQuestionAnswer::find($id);

        if (!$answer) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }

        // Validar los datos recibidos
        $validatedData = $request->validate([
            'answer' => 'required|string|max:255', // Ajusta según tus necesidades
            'survey_question_id' => 'nullable|integer|exists:survey_questions,id',
            'survey_answer_id' => 'nullable|integer|exists:survey_answers,id',
        ]);

        // Actualizar los campos del registro
        $answer->update($validatedData);

        // Retornar la respuesta actualizada
        return response()->json($answer, 200);
    }
}
