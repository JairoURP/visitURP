<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    protected $table = 'survey_question_answers'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Establece 'id' como la clave primaria

    public $timestamps = true; // Habilita los timestamps (created_at, updated_at)

    // Permite la asignación masiva de estos campos
    protected $fillable = ['survey_question_id', 'survey_answer_id', 'answer'];
}
