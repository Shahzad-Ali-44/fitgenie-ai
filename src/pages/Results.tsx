import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, CheckCircle, TrendingUp, Clock, Target } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No recommendations found</h1>
          <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleNewPlan = () => {
    navigate('/plan');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={handleGoHome}
            className="text-white hover:text-indigo-400 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 font-medium mb-6">
            <CheckCircle className="w-5 h-5 mr-2" />
            Your Personalized Plan is Ready!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-indigo-400">Fitness Journey</span> Starts Here
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {recommendations.personalized_summary}
          </p>
        </div>

        <div className="space-y-8">
          {recommendations.bmi_analysis && (
            <Card className="p-8 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-indigo-300">Health Analysis</h3>
              </div>
              <p className="text-slate-200 text-lg">{recommendations.bmi_analysis}</p>
            </Card>
          )}

          {recommendations.diet_plan && (
            <Card className="p-8 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <div className="flex items-center mb-6">
                <Target className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-indigo-300">🍽️ Your Diet Plan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Diet Types</h4>
                  <ul className="space-y-3">
                    {recommendations.diet_plan.diet_types?.map((item: string, index: number) => (
                      <li key={index} className="text-slate-200 flex items-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Nutrition Details</h4>
                  <div className="space-y-3 text-slate-200">
                    {recommendations.diet_plan.daily_calories && (
                      <div className="flex justify-between">
                        <span className="font-medium">Calories:</span>
                        <span>{recommendations.diet_plan.daily_calories}</span>
                      </div>
                    )}
                    {recommendations.diet_plan.macros && (
                      <div className="flex justify-between">
                        <span className="font-medium">Macros:</span>
                        <span className="text-right max-w-48">{recommendations.diet_plan.macros}</span>
                      </div>
                    )}
                    {recommendations.diet_plan.meal_timing && (
                      <div>
                        <span className="font-medium block mb-2">Meal Timing:</span>
                        <ul className="space-y-1">
                          {recommendations.diet_plan.meal_timing.map((timing: string, index: number) => (
                            <li key={index} className="text-sm">• {timing}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {recommendations.workout_plan && (
            <Card className="p-8 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-indigo-300">💪 Your Workout Plan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Workout Types</h4>
                  <ul className="space-y-3">
                    {recommendations.workout_plan.workout_types?.map((item: string, index: number) => (
                      <li key={index} className="text-slate-200 flex items-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Schedule Details</h4>
                  <div className="space-y-3 text-slate-200">
                    {recommendations.workout_plan.frequency && (
                      <div className="flex justify-between">
                        <span className="font-medium">Frequency:</span>
                        <span>{recommendations.workout_plan.frequency}</span>
                      </div>
                    )}
                    {recommendations.workout_plan.duration && (
                      <div className="flex justify-between">
                        <span className="font-medium">Duration:</span>
                        <span>{recommendations.workout_plan.duration}</span>
                      </div>
                    )}
                    {recommendations.workout_plan.intensity && (
                      <div className="flex justify-between">
                        <span className="font-medium">Intensity:</span>
                        <span>{recommendations.workout_plan.intensity}</span>
                      </div>
                    )}
                    {recommendations.workout_plan.schedule && (
                      <div>
                        <span className="font-medium block mb-2">Weekly Schedule:</span>
                        <ul className="space-y-1">
                          {recommendations.workout_plan.schedule.map((day: string, index: number) => (
                            <li key={index} className="text-sm">• {day}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {recommendations.meal_suggestions && (
            <Card className="p-8 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <h3 className="text-2xl font-bold text-indigo-300 mb-6">🍎 Meal Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(recommendations.meal_suggestions).map(([mealType, meals]: any) => (
                  <div key={mealType}>
                    <h4 className="text-lg font-semibold text-slate-300 mb-4 capitalize">
                      {mealType}
                    </h4>
                    <ul className="space-y-2">
                      {Array.isArray(meals) && meals.map((meal: string, index: number) => (
                        <li key={index} className="text-slate-200 flex items-start">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {meal}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.supplements && (
              <Card className="p-6 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">💊 Recommended Supplements</h3>
                <ul className="space-y-2">
                  {recommendations.supplements.map((item: string, index: number) => (
                    <li key={index} className="text-slate-200 flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {recommendations.lifestyle_tips && (
              <Card className="p-6 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
                <h3 className="text-xl font-bold text-indigo-300 mb-4">🌟 Lifestyle Tips</h3>
                <ul className="space-y-2">
                  {recommendations.lifestyle_tips.map((item: string, index: number) => (
                    <li key={index} className="text-slate-200 flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {recommendations.progress_tracking && (
            <Card className="p-6 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">📊 Progress Tracking</h3>
              <ul className="space-y-2">
                {recommendations.progress_tracking.map((item: string, index: number) => (
                  <li key={index} className="text-slate-200 flex items-start">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {recommendations.concern_response && (
            <Card className="p-6 bg-slate-800/50 border border-slate-700/50 shadow-xl rounded-3xl">
              <h3 className="text-xl font-bold text-indigo-300 mb-4">❓ Your Questions Answered</h3>
              <div className="text-slate-200">
                {Array.isArray(recommendations.concern_response) ? (
                  recommendations.concern_response.map((item: string, index: number) => (
                    <p key={index} className="mb-2">{item}</p>
                  ))
                ) : (
                  <p>{recommendations.concern_response}</p>
                )}
              </div>
            </Card>
          )}
        </div>

        <div className="flex justify-center items-center mt-12">
          <Button
            onClick={handleNewPlan}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Create New Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
