import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Utensils, 
  Dumbbell, 
  Apple, 
  Pill, 
  BarChart, 
  ArrowLeft
} from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations;
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No recommendations found</h1>
          <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300">
            Go Home
          </Button>
        </div>
      </div>
    );
  }


  const handleBackHome = () => {
    navigate('/');
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "diet", label: "Diet Plan", icon: Utensils },
    { id: "workout", label: "Workout", icon: Dumbbell },
    { id: "meals", label: "Meal Ideas", icon: Apple },
    { id: "supplements", label: "Supplements & Tips", icon: Pill },
    { id: "progress", label: "Progress", icon: BarChart }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4">Personalized Summary</h3>
        <p className="text-slate-300 leading-relaxed">{recommendations.personalized_summary}</p>
      </div>

      {recommendations.bmi_analysis && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4">Health Analysis</h3>
          <p className="text-slate-300 leading-relaxed">{recommendations.bmi_analysis}</p>
        </div>
      )}
    </div>
  );

  const renderDietTab = () => (
    <div className="space-y-6">
      {recommendations.diet_plan && (
        <>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4">Diet Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.diet_plan.diet_types?.map((item: string, index: number) => (
                <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.diet_plan.daily_calories && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Daily Calories</h4>
                <p className="text-slate-300">{recommendations.diet_plan.daily_calories}</p>
              </div>
            )}

            {recommendations.diet_plan.macros && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Macronutrients</h4>
                <p className="text-slate-300">{recommendations.diet_plan.macros}</p>
              </div>
            )}
          </div>

          {recommendations.diet_plan.meal_timing && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-lg font-bold text-white mb-4">Meal Timing</h4>
              <div className="space-y-2">
                {recommendations.diet_plan.meal_timing.map((timing: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">{timing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendations.diet_plan.hydration && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-lg font-bold text-white mb-4">Hydration</h4>
              <div className="space-y-2">
                {recommendations.diet_plan.hydration.map((item: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderWorkoutTab = () => (
    <div className="space-y-6">
      {recommendations.workout_plan && (
        <>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4">Workout Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.workout_plan.workout_types?.map((item: string, index: number) => (
                <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.workout_plan.frequency && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Frequency</h4>
                <p className="text-slate-300">{recommendations.workout_plan.frequency}</p>
              </div>
            )}

            {recommendations.workout_plan.duration && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Duration</h4>
                <p className="text-slate-300">{recommendations.workout_plan.duration}</p>
              </div>
            )}

            {recommendations.workout_plan.intensity && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Intensity</h4>
                <p className="text-slate-300">{recommendations.workout_plan.intensity}</p>
              </div>
            )}
          </div>

          {recommendations.workout_plan.schedule && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <h4 className="text-lg font-bold text-white mb-4">Weekly Schedule</h4>
              <div className="space-y-2">
                {recommendations.workout_plan.schedule.map((day: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderMealsTab = () => (
    <div className="space-y-6">
      {recommendations.meal_suggestions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(recommendations.meal_suggestions).map(([mealType, meals]: any) => (
            <div key={mealType} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <h3 className="text-lg font-bold text-white capitalize mb-4">{mealType}</h3>
              <div className="space-y-2">
                {Array.isArray(meals) && meals.map((meal: string, index: number) => (
                  <div key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300 text-sm">{meal}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSupplementsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.supplements && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Supplements</h3>
            <div className="space-y-2">
              {recommendations.supplements.map((item: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations.lifestyle_tips && (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Lifestyle Tips</h3>
            <div className="space-y-2">
              {recommendations.lifestyle_tips.map((item: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-6">
      {recommendations.progress_tracking && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4">Progress Tracking</h3>
          <div className="space-y-2">
            {recommendations.progress_tracking.map((item: string, index: number) => (
              <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.concern_response && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4">Answer to Your Question</h3>
          <div className="text-slate-300 leading-relaxed">
            {(() => {
              const parts = recommendations.concern_response.split(/(\d+\.\s)/);
              const introText = parts[0].trim();
              const numberedParts = parts.slice(1);
              
              return (
                <>
                  {introText && (
                    <p className="mb-4 text-slate-300 leading-relaxed">
                      {introText.split('**').map((part: string, index: number) => {
                        if (index % 2 === 1) {
                          return <strong key={index} className="text-white font-semibold">{part}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  )}
                  {numberedParts.map((part: string, partIndex: number) => {
                    if (part.match(/^\d+\.\s$/)) {
                      return (
                        <div key={partIndex} className="mb-3">
                          <span className="text-indigo-400 font-bold text-lg">{part}</span>
                          {partIndex + 1 < numberedParts.length && (
                            <span className="ml-2">
                              {numberedParts[partIndex + 1].split('**').map((boldPart: string, boldPartIndex: number) => {
                                if (boldPartIndex % 2 === 1) {
                                  return <strong key={boldPartIndex} className="text-white font-semibold">{boldPart}</strong>;
                                }
                                return boldPart;
                              })}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverviewTab();
      case "diet":
        return renderDietTab();
      case "workout":
        return renderWorkoutTab();
      case "meals":
        return renderMealsTab();
      case "supplements":
        return renderSupplementsTab();
      case "progress":
        return renderProgressTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBackHome}
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-indigo-400">Fitness Plan</span>
          </h1>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-2 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center px-3 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
};

export default Results;
