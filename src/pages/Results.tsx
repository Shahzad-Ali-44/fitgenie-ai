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
  ArrowLeft,
  Download
} from "lucide-react";
import { jsPDF } from 'jspdf';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations;
  const [activeTab, setActiveTab] = useState("overview");

  const formatTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-white">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

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

  const handleDownloadPlan = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    const addText = (text: string, fontSize: number = 12, isBold: boolean = false, color: string = '#000000') => {
      if (!text || text.trim() === '') return;
      
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(color);
      
      const cleanText = String(text).replace(/[^\x20-\x7E]/g, '');
      const lines = doc.splitTextToSize(cleanText, maxWidth);
      
      const lineHeight = fontSize * 0.4 + 1;
      const totalHeight = lines.length * lineHeight;
      
      if (yPosition + totalHeight > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(lines, margin, yPosition);
      yPosition += totalHeight;
    };

    const addSectionHeader = (text: string) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      yPosition += 3;
      addText(text, 14, true, '#4F46E5');
      addText('-'.repeat(50), 10, false, '#6B7280');
    };

    addText('FITGENIE AI - PERSONALIZED FITNESS PLAN', 18, true, '#1F2937');
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
    addText('Generated on ' + formattedDate, 10, false, '#6B7280');
    yPosition += 10;

    if (recommendations.personalized_summary) {
      addSectionHeader('PERSONALIZED SUMMARY');
      addText(String(recommendations.personalized_summary));
    }

    if (recommendations.bmi_analysis) {
      addSectionHeader('HEALTH ANALYSIS');
      addText(String(recommendations.bmi_analysis));
    }

    if (recommendations.diet_plan) {
      addSectionHeader('DIET PLAN');
      Object.entries(recommendations.diet_plan).forEach(([key, value]) => {
        const label = key.replace(/_/g, ' ').toUpperCase();
        if (Array.isArray(value)) {
          addText(`${label}: ${value.join(', ')}`);
        } else {
          addText(`${label}: ${value}`);
        }
      });
    }

    if (recommendations.workout_plan) {
      addSectionHeader('WORKOUT PLAN');
      Object.entries(recommendations.workout_plan).forEach(([key, value]) => {
        const label = key.replace(/_/g, ' ').toUpperCase();
        if (Array.isArray(value)) {
          addText(`${label}: ${value.join(', ')}`);
        } else {
          addText(`${label}: ${value}`);
        }
      });
    }

    if (recommendations.meal_suggestions) {
      addSectionHeader('MEAL SUGGESTIONS');
      Object.entries(recommendations.meal_suggestions).forEach(([mealType, meals]) => {
        addText(`${mealType.toUpperCase()}:`, 12, true);
        if (Array.isArray(meals)) {
          meals.forEach(meal => addText(`  • ${meal}`, 10));
        } else {
          addText(`  ${meals}`, 10);
        }
      });
    }

    if (recommendations.supplements) {
      addSectionHeader('SUPPLEMENTS');
      if (Array.isArray(recommendations.supplements)) {
        recommendations.supplements.forEach((supplement: string) => {
          const cleanText = supplement.replace(/\*\*/g, '');
          addText(cleanText, 10);
        });
      } else {
        addText(recommendations.supplements, 10);
      }
    }

    if (recommendations.lifestyle_tips) {
      addSectionHeader('LIFESTYLE TIPS');
      if (Array.isArray(recommendations.lifestyle_tips)) {
        recommendations.lifestyle_tips.forEach((tip: string) => {
          const cleanText = tip.replace(/\*\*/g, '');
          addText(cleanText, 10);
        });
      } else {
        addText(recommendations.lifestyle_tips, 10);
      }
    }

    if (recommendations.progress_tracking) {
      addSectionHeader('PROGRESS TRACKING');
      if (Array.isArray(recommendations.progress_tracking)) {
        recommendations.progress_tracking.forEach((track: string) => {
          const cleanText = track.replace(/\*\*/g, '');
          addText(cleanText, 10);
        });
      } else {
        addText(recommendations.progress_tracking, 10);
      }
    }

    yPosition += 5;
    addText('-'.repeat(50), 10, false, '#6B7280');
    addText('Generated by FitGenie AI', 10, false, '#6B7280');
    addText('Visit: https://fitgenie-ai.vercel.app', 10, false, '#6B7280');

    doc.save('fitness-plan.pdf');
  };

  const tabs = [
    { id: "overview", label: "Overview", shortLabel: "Overview", icon: TrendingUp },
    { id: "diet", label: "Diet Plan", shortLabel: "Diet", icon: Utensils },
    { id: "workout", label: "Workout", shortLabel: "Workout", icon: Dumbbell },
    { id: "meals", label: "Meal Ideas", shortLabel: "Meals", icon: Apple },
    { id: "supplements", label: "Supplements & Tips", shortLabel: "Supplements", icon: Pill },
    { id: "progress", label: "Progress", shortLabel: "Progress", icon: BarChart }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
        <h3 className="text-xl font-bold text-white mb-4">Personalized Summary</h3>
        <p className="text-slate-300 leading-relaxed">{String(recommendations.personalized_summary)}</p>
      </div>

      {recommendations.bmi_analysis && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-4">Health Analysis</h3>
          <p className="text-slate-300 leading-relaxed">{String(recommendations.bmi_analysis)}</p>
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
                <p className="text-slate-300">{String(recommendations.diet_plan.daily_calories)}</p>
              </div>
            )}

            {recommendations.diet_plan.macros && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Macronutrients</h4>
                <p className="text-slate-300">{String(recommendations.diet_plan.macros)}</p>
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
                <p className="text-slate-300">{String(recommendations.workout_plan.frequency)}</p>
              </div>
            )}

            {recommendations.workout_plan.duration && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Duration</h4>
                <p className="text-slate-300">{String(recommendations.workout_plan.duration)}</p>
              </div>
            )}

            {recommendations.workout_plan.intensity && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="text-lg font-bold text-white mb-3">Intensity</h4>
                <p className="text-slate-300">{String(recommendations.workout_plan.intensity)}</p>
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
                  <span className="text-slate-300 text-sm">{formatTextWithBold(item)}</span>
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
                  <span className="text-slate-300 text-sm">{formatTextWithBold(item)}</span>
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
                <span className="text-slate-300">{formatTextWithBold(item)}</span>
              </div>
            ))}
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
          
          <Button
            onClick={handleDownloadPlan}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Plan
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
                  className={`flex flex-col items-center justify-center px-2 py-3 rounded-xl transition-all duration-300 min-h-[60px] ${
                    activeTab === tab.id
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="font-medium text-xs text-center leading-tight">
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
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
