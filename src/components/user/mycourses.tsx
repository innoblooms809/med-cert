"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Tabs,
  List,
  Typography,
  Row,
  Col,
  message,
  Modal,
  Progress,
  Radio,
  Space,
} from "antd";
import {
  PlayCircleOutlined,
  FilePdfOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import cardio from "../../../public/images/cardiology.jpg";
import basics from "../../../public/images/ECG.jpeg";
import pharma from "../../../public/images/pharma.jpg";
import inter from "../../../public/images/inter.png";

const { Title, Text } = Typography;

// 10 questions per quiz
const quizQuestions = {
  "t1": [ // Heart Anatomy Quiz - 10 questions
    {
      id: "t1_q1",
      question: "Which chamber receives oxygenated blood from lungs?",
      options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
      correct: 1
    },
    {
      id: "t1_q2",
      question: "Mitral valve prevents backflow from:",
      options: ["Aorta to LV", "PA to RV", "LA to LV", "RA to RV"],
      correct: 2
    },
    {
      id: "t1_q3",
      question: "Pulmonary artery carries:",
      options: ["Oxygenated blood to body", "Deoxygenated blood to lungs", "Oxygenated blood to lungs", "Deoxygenated blood to heart"],
      correct: 1
    },
    {
      id: "t1_q4",
      question: "Which is NOT a heart valve?",
      options: ["Mitral", "Tricuspid", "Pulmonary", "Carotid"],
      correct: 3
    },
    {
      id: "t1_q5",
      question: "SA node is located in:",
      options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
      correct: 1
    },
    {
      id: "t1_q6",
      question: "Blood supply to heart muscle is via:",
      options: ["Pulmonary arteries", "Coronary arteries", "Aorta", "Vena cava"],
      correct: 1
    },
    {
      id: "t1_q7",
      question: "Which chamber has thickest wall?",
      options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
      correct: 3
    },
    {
      id: "t1_q8",
      question: "Tricuspid valve has how many leaflets?",
      options: ["2", "3", "4", "1"],
      correct: 1
    },
    {
      id: "t1_q9",
      question: "Which vessel carries blood from heart to body?",
      options: ["Pulmonary artery", "Aorta", "Superior vena cava", "Pulmonary vein"],
      correct: 1
    },
    {
      id: "t1_q10",
      question: "Pericardium function is:",
      options: ["Contraction", "Protection", "Electrical conduction", "Blood filtration"],
      correct: 1
    }
  ],
  "t2": [ // Anatomy MCQ - 10 questions
    {
      id: "t2_q1",
      question: "Heart is located in:",
      options: ["Abdominal cavity", "Thoracic cavity", "Pelvic cavity", "Cranial cavity"],
      correct: 1
    },
    {
      id: "t2_q2",
      question: "Myocardium is responsible for:",
      options: ["Protection", "Contraction", "Lubrication", "Electrical conduction"],
      correct: 1
    },
    {
      id: "t2_q3",
      question: "Endocardium lines:",
      options: ["Outer surface", "Heart chambers", "Pericardial sac", "Coronary vessels"],
      correct: 1
    },
    {
      id: "t2_q4",
      question: "Normal heart weight in adults:",
      options: ["100-150g", "200-250g", "300-350g", "400-450g"],
      correct: 2
    },
    {
      id: "t2_q5",
      question: "Base of heart is formed by:",
      options: ["Atria", "Ventricles", "Apex", "Valves"],
      correct: 0
    },
    {
      id: "t2_q6",
      question: "Apex beat is felt at:",
      options: ["2nd left ICS", "5th left ICS", "2nd right ICS", "5th right ICS"],
      correct: 1
    },
    {
      id: "t2_q7",
      question: "Which is NOT part of cardiac skeleton?",
      options: ["Fibrous rings", "Tendon of Todaro", "Membranous septum", "Papillary muscles"],
      correct: 3
    },
    {
      id: "t2_q8",
      question: "Coronary sinus opens into:",
      options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
      correct: 0
    },
    {
      id: "t2_q9",
      question: "Thebesian valves are in:",
      options: ["Coronary sinus", "IVC", "SVC", "Pulmonary veins"],
      correct: 0
    },
    {
      id: "t2_q10",
      question: "Chordae tendineae connect:",
      options: ["Atria to ventricles", "Valves to papillary muscles", "Ventricles to arteries", "Atria to veins"],
      correct: 1
    }
  ],
  "t3": [ // ECG Test - 10 questions
    {
      id: "t3_q1",
      question: "QRS complex represents:",
      options: ["Atrial depolarization", "Ventricular depolarization", "Atrial repolarization", "Ventricular repolarization"],
      correct: 1
    },
    {
      id: "t3_q2",
      question: "Normal PR interval duration:",
      options: ["0.06-0.10s", "0.12-0.20s", "0.20-0.30s", "0.30-0.40s"],
      correct: 1
    },
    {
      id: "t3_q3",
      question: "P wave represents:",
      options: ["Atrial depolarization", "Ventricular depolarization", "Atrial repolarization", "Ventricular repolarization"],
      correct: 0
    },
    {
      id: "t3_q4",
      question: "QT interval represents:",
      options: ["Atrial activity", "Ventricular depolarization & repolarization", "Conduction delay", "SA node firing"],
      correct: 1
    },
    {
      id: "t3_q5",
      question: "Normal QRS duration:",
      options: ["<0.12s", "0.12-0.20s", "0.20-0.30s", ">0.30s"],
      correct: 0
    },
    {
      id: "t3_q6",
      question: "ST segment elevation indicates:",
      options: ["Hypokalemia", "Hyperkalemia", "Myocardial ischemia", "Atrial enlargement"],
      correct: 2
    },
    {
      id: "t3_q7",
      question: "Lead II shows:",
      options: ["Right arm to left leg", "Left arm to left leg", "Right arm to left arm", "Chest to left leg"],
      correct: 0
    },
    {
      id: "t3_q8",
      question: "Normal heart rate in ECG:",
      options: ["60-100 bpm", "100-120 bpm", "40-60 bpm", "120-140 bpm"],
      correct: 0
    },
    {
      id: "t3_q9",
      question: "U wave is seen in:",
      options: ["Hypercalcemia", "Hypokalemia", "Hypernatremia", "Hypomagnesemia"],
      correct: 1
    },
    {
      id: "t3_q10",
      question: "Which lead is bipolar?",
      options: ["V1", "V2", "Lead I", "aVR"],
      correct: 2
    }
  ],
  "t4": [ // Pharma Quiz - 10 questions
    {
      id: "t4_q1",
      question: "First-line hypertension drug:",
      options: ["Warfarin", "Digoxin", "Lisinopril", "Metformin"],
      correct: 2
    },
    {
      id: "t4_q2",
      question: "Beta-blockers mechanism:",
      options: ["Block calcium channels", "Inhibit ACE", "Block beta-receptors", "Increase potassium"],
      correct: 2
    },
    {
      id: "t4_q3",
      question: "Aspirin dose for MI:",
      options: ["75mg", "150mg", "300mg", "600mg"],
      correct: 2
    },
    {
      id: "t4_q4",
      question: "Statins reduce:",
      options: ["Blood pressure", "Cholesterol", "Blood sugar", "Heart rate"],
      correct: 1
    },
    {
      id: "t4_q5",
      question: "Nitroglycerin is for:",
      options: ["Hypertension", "Angina", "Arrhythmia", "Heart failure"],
      correct: 1
    },
    {
      id: "t4_q6",
      question: "Warfarin antidote:",
      options: ["Vitamin K", "Protamine", "Naloxone", "Flumazenil"],
      correct: 0
    },
    {
      id: "t4_q7",
      question: "Amiodarone is used for:",
      options: ["Hypertension", "Arrhythmia", "Angina", "Heart failure"],
      correct: 1
    },
    {
      id: "t4_q8",
      question: "Digoxin toxicity symptom:",
      options: ["Tachycardia", "Bradycardia", "Hypertension", "Hyperglycemia"],
      correct: 1
    },
    {
      id: "t4_q9",
      question: "Heparin antidote:",
      options: ["Vitamin K", "Protamine", "Naloxone", "Flumazenil"],
      correct: 1
    },
    {
      id: "t4_q10",
      question: "Furosemide is a:",
      options: ["Beta-blocker", "Diuretic", "ACE inhibitor", "Calcium blocker"],
      correct: 1
    }
  ],
  "t5": [ // Intervention Quiz - 10 questions
    {
      id: "t5_q1",
      question: "PCI stands for:",
      options: ["Primary Cardiac Intervention", "Percutaneous Coronary Intervention", "Preventive Cardiac Investigation", "Post-Cardiac Infarction"],
      correct: 1
    },
    {
      id: "t5_q2",
      question: "Most common artery in MI:",
      options: ["Right coronary", "Left anterior descending", "Circumflex", "Posterior descending"],
      correct: 1
    },
    {
      id: "t5_q3",
      question: "CABG means:",
      options: ["Coronary Angiography Bypass Graft", "Coronary Artery Bypass Graft", "Cardiac Artery Bypass Graft", "Coronary Aortic Bypass Graft"],
      correct: 1
    },
    {
      id: "t5_q4",
      question: "STEMI treatment window:",
      options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
      correct: 2
    },
    {
      id: "t5_q5",
      question: "Balloon angioplasty was invented by:",
      options: ["Andreas Gruentzig", "Werner Forssmann", "Christian Barnard", "Michael DeBakey"],
      correct: 0
    },
    {
      id: "t5_q6",
      question: "Drug-eluting stents prevent:",
      options: ["Infection", "Restenosis", "Bleeding", "Arrhythmia"],
      correct: 1
    },
    {
      id: "t5_q7",
      question: "IVUS is used for:",
      options: ["Pressure measurement", "Imaging vessel wall", "Blood flow measurement", "Electrical activity"],
      correct: 1
    },
    {
      id: "t5_q8",
      question: "Which is NOT an access site for PCI?",
      options: ["Femoral artery", "Radial artery", "Brachial artery", "Jugular vein"],
      correct: 3
    },
    {
      id: "t5_q9",
      question: "TIMI flow grade 3 means:",
      options: ["No flow", "Slow flow", "Normal flow", "Complete blockage"],
      correct: 2
    },
    {
      id: "t5_q10",
      question: "Contrast-induced nephropathy risk factor:",
      options: ["Young age", "Normal renal function", "Diabetes", "Low dose contrast"],
      correct: 2
    }
  ]
};

export default function MyCourses({ dict, lang }: any) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeTest, setActiveTest] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [selectedTestId, setSelectedTestId] = useState<string>("");
  const [quizData, setQuizData] = useState({
    currentQuestion: 0,
    answers: {} as Record<string, number>,
    isSubmitted: false
  });

  const courses = [
    {
      id: 1,
      title: dict?.myCoursesData?.lecture1 || "Lecture 1 - Heart Anatomy",
      description: dict?.myCoursesData?.lecture1Desc || "Overview of cardiac chambers, valves and major vessels.",
      image: cardio,
      video: "/videos/alice.mp4",
      announcements: [
        dict?.myCoursesData?.lecture1A1 || "Live doubt session on Friday",
        dict?.myCoursesData?.lecture1A2 || "Assignment due next week",
      ],
      tests: [
        {
          id: "t1",
          name: dict?.myCoursesData?.heartQuiz || "Heart Anatomy Quiz",
          language: dict?.languageMixed || "English/Arabic",
        },
        {
          id: "t2",
          name: dict?.myCoursesData?.mcq || "Anatomy MCQ",
          language: dict?.languageMixed || "English/Arabic",
        },
      ],
      pdfs: ["/pdfs/Heart-Anatomy-Notes.pdf", "/pdfs/Cardiac-Diagram.pdf"],
    },
    {
      id: 2,
      title: dict?.myCoursesData?.lecture2 || "Lecture 2 - ECG Basics",
      description: dict?.myCoursesData?.lecture2Desc || "How to read a basic ECG and recognize common patterns.",
      image: basics,
      video: "/assets/videos/alice.mp4",
      announcements: [
        dict?.myCoursesData?.lecture2A1 || "Quiz will be unlocked Sunday",
      ],
      tests: [
        {
          id: "t3",
          name: dict?.myCoursesData?.ecgTest || "ECG Pattern Test",
          language: dict?.languageEnglish || "English",
        },
      ],
      pdfs: ["/pdfs/ECG-Basics.pdf"],
    },
    {
      id: 3,
      title: dict?.myCoursesData?.lecture3 || "Lecture 3 - Cardiac Pharmacology",
      description: dict?.myCoursesData?.lecture3Desc || "Key drugs used in emergency cardiac care and their effects.",
      image: pharma,
      video: "/videos/lecture3.mp4",
      announcements: [
        dict?.myCoursesData?.lecture3A1 || "MCQ practice paper uploaded",
      ],
      tests: [
        {
          id: "t4",
          name: dict?.myCoursesData?.pharmaQuiz || "Pharma Quiz",
          language: dict?.languageArabic || "Arabic",
        },
      ],
      pdfs: ["/pdfs/Cardiac-Drugs.pdf"],
    },
    {
      id: 4,
      title: dict?.myCoursesData?.lecture4 || "Lecture 4 - Interventions",
      description: dict?.myCoursesData?.lecture4Desc || "PCI basics and indications — case discussions.",
      image: inter,
      video: "/videos/lecture4.mp4",
      announcements: [
        dict?.myCoursesData?.lecture4A1 || "Case study discussion on Wednesday",
      ],
      tests: [
        {
          id: "t5",
          name: dict?.myCoursesData?.interQuiz || "Intervention Quiz",
          language: dict?.languageEnglish || "English",
        },
      ],
      pdfs: ["/pdfs/PCI-Guidelines.pdf"],
    },
  ];

  // Get test results from localStorage
  const getTestResults = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizResults');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error("Error parsing quiz results:", error);
          return {};
        }
      }
    }
    return {};
  };

  const handleStartTest = (test: any) => {
    setActiveTest(test);
    setQuizData({
      currentQuestion: 0,
      answers: {},
      isSubmitted: false
    });
    setShowQuiz(true);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setQuizData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: optionIndex
      }
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeTest) return;
    
    const questions = quizQuestions[activeTest.id as keyof typeof quizQuestions] || [];
    let correct = 0;
    
    questions.forEach(q => {
      if (quizData.answers[q.id] === q.correct) {
        correct++;
      }
    });
    
    const result = {
      score: correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      passed: (correct / questions.length) >= 0.7,
      timestamp: new Date().toISOString(),
      answers: quizData.answers, // Save user answers
      testName: activeTest.name
    };
    
    // Save to localStorage
    const allResults = getTestResults();
    allResults[activeTest.id] = result;
    localStorage.setItem('quizResults', JSON.stringify(allResults));
    
    // Mark as submitted
    setQuizData(prev => ({ ...prev, isSubmitted: true }));
    
    // Show success message
    message.success("Quiz submitted successfully! You can view results from View Result button.");
  };

  const handleViewResult = (testId: string) => {
    const results = getTestResults();
    const result = results[testId];
    
    if (!result) {
      message.warning("Please complete the test first!");
      return;
    }
    
    // Fix: Ensure answers object exists
    const resultWithAnswers = {
      ...result,
      answers: result.answers || {} // Default to empty object if undefined
    };
    
    setSelectedResult(resultWithAnswers);
    setSelectedTestId(testId);
    setShowResultModal(true);
  };

  // Render Result Modal
  const renderResultModal = () => {
    if (!showResultModal || !selectedResult) return null;
    
    const questions = quizQuestions[selectedTestId as keyof typeof quizQuestions] || [];
    
    return (
      <Modal
        title={`Test Result - ${selectedResult.testName || selectedTestId}`}
        open={showResultModal}
        onCancel={() => setShowResultModal(false)}
        width={800}
        style={{ top: 20 }}
        footer={[
          <Button key="close" onClick={() => setShowResultModal(false)}>
            Close
          </Button>
        ]}
      >
        <div style={{ padding: "10px" }}>
          {/* Score Summary */}
          <div style={{ 
            textAlign: "center", 
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#fafafa",
            borderRadius: "8px"
          }}>
            <Title level={2} style={{ marginBottom: "10px" }}>
              {selectedResult.score}/{selectedResult.total}
            </Title>
            <div style={{ 
              fontSize: "20px", 
              fontWeight: "bold",
              color: selectedResult.passed ? "#52c41a" : "#ff4d4f",
              marginBottom: "10px"
            }}>
              {selectedResult.passed ? "PASSED" : "FAILED"}
            </div>
            <Text type="secondary">
              Submitted on: {new Date(selectedResult.timestamp).toLocaleDateString()}
            </Text>
          </div>
          
          {/* Question-wise Review */}
          <Title level={4} style={{ marginBottom: "20px" }}>
            Question-wise Review:
          </Title>
          
          <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
            {questions.map((q, idx) => {
              // FIX: Check if answers exist and has the question id
              const userAnswer = selectedResult.answers ? selectedResult.answers[q.id] : undefined;
              const isCorrect = userAnswer !== undefined && userAnswer === q.correct;
              
              return (
                <Card 
                  key={q.id} 
                  size="small" 
                  style={{ 
                    marginBottom: "15px",
                    borderLeft: `4px solid ${isCorrect ? "#52c41a" : "#ff4d4f"}`
                  }}
                >
                  <div style={{ marginBottom: "10px" }}>
                    <Text strong>Q{idx + 1}: {q.question}</Text>
                  </div>
                  
                  <div style={{ marginLeft: "10px" }}>
                    {q.options.map((opt, optIdx) => {
                      const isUserAnswer = userAnswer === optIdx;
                      const isCorrectAnswer = optIdx === q.correct;
                      
                      return (
                        <div 
                          key={optIdx}
                          style={{ 
                            padding: "8px 5px",
                            margin: "4px 0",
                            backgroundColor: isCorrectAnswer ? "#f6ffed" : 
                                          isUserAnswer && !isCorrect ? "#fff2f0" : "transparent",
                            borderRadius: "4px",
                            border: isCorrectAnswer ? "1px solid #b7eb8f" : 
                                   isUserAnswer && !isCorrect ? "1px solid #ffccc7" : "1px solid transparent"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ 
                              width: "20px", 
                              height: "20px", 
                              borderRadius: "50%",
                              backgroundColor: isCorrectAnswer ? "#52c41a" : 
                                            isUserAnswer && !isCorrect ? "#ff4d4f" : "#d9d9d9",
                              marginRight: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "12px"
                            }}>
                              {isCorrectAnswer ? "✓" : 
                               isUserAnswer && !isCorrect ? "✗" : ""}
                            </div>
                            <div>
                              <Text style={{ 
                                color: isCorrectAnswer ? "#52c41a" : 
                                      isUserAnswer && !isCorrect ? "#ff4d4f" : "#000"
                              }}>
                                {opt}
                                {isCorrectAnswer && " (Correct Answer)"}
                                {isUserAnswer && !isCorrect && " (Your Answer)"}
                              </Text>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div style={{ 
                    marginTop: "15px", 
                    padding: "10px",
                    backgroundColor: "#fafafa",
                    borderRadius: "4px"
                  }}>
                    <Text type="secondary">
                      <strong>Status:</strong>{" "}
                      <span style={{ 
                        color: isCorrect ? "#52c41a" : "#ff4d4f",
                        fontWeight: "bold"
                      }}>
                        {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                      </span>
                      {userAnswer === undefined && (
                        <span style={{ color: "#fa8c16", marginLeft: "10px" }}>
                          (Not answered)
                        </span>
                      )}
                    </Text>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {/* Performance Summary */}
          <Card style={{ marginTop: "20px" }}>
            <Title level={5} style={{ marginBottom: "15px" }}>Performance Summary</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#52c41a" }}>
                    {selectedResult.score}
                  </div>
                  <Text type="secondary">Correct Answers</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff4d4f" }}>
                    {selectedResult.total - selectedResult.score}
                  </div>
                  <Text type="secondary">Incorrect Answers</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Modal>
    );
  };

  // Render Quiz Modal
  const renderQuizModal = () => {
    if (!activeTest || !showQuiz) return null;
    
    const questions = quizQuestions[activeTest.id as keyof typeof quizQuestions] || [];
    
    if (questions.length === 0) {
      return (
        <Modal
          title={activeTest.name}
          open={showQuiz}
          onCancel={() => setShowQuiz(false)}
          footer={[
            <Button key="close" onClick={() => setShowQuiz(false)}>
              Close
            </Button>
          ]}
        >
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Title level={4}>No questions available for this test</Title>
          </div>
        </Modal>
      );
    }

    const currentQuestion = questions[quizData.currentQuestion];
    const isLastQuestion = quizData.currentQuestion === questions.length - 1;
    const answeredCount = Object.keys(quizData.answers).length;

    if (quizData.isSubmitted) {
      // Quiz Submitted View (Simple - No results shown)
      return (
        <Modal
          title="Quiz Submitted"
          open={showQuiz}
          onCancel={() => setShowQuiz(false)}
          footer={[
            <Button 
              key="close" 
              type="primary" 
              onClick={() => setShowQuiz(false)}
            >
              Close
            </Button>
          ]}
        >
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ 
              fontSize: "48px", 
              color: "#52c41a",
              marginBottom: "20px"
            }}>
              ✓
            </div>
            <Title level={3} style={{ color: "#52c41a" }}>
              Quiz Submitted Successfully!
            </Title>
            <Text style={{ fontSize: "16px", display: "block", margin: "20px 0" }}>
              Your quiz has been submitted successfully.
            </Text>
            <Text type="secondary" style={{ display: "block", marginBottom: "30px" }}>
              You can view your results by clicking on "View Result" button.
            </Text>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#f6ffed",
              borderRadius: "8px",
              marginTop: "20px"
            }}>
              <Text>Answered: {answeredCount}/{questions.length} questions</Text>
            </div>
          </div>
        </Modal>
      );
    }

    // Quiz Questions View
    return (
      <Modal
        title={`${activeTest.name} (Question ${quizData.currentQuestion + 1}/${questions.length})`}
        open={showQuiz}
        onCancel={() => setShowQuiz(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <div>
          {/* Progress Bar */}
          <div style={{ marginBottom: "20px" }}>
            <Progress 
              percent={((quizData.currentQuestion + 1) / questions.length) * 100} 
              size="small" 
              showInfo={false}
            />
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              marginTop: "5px"
            }}>
              <Text type="secondary">
                Question {quizData.currentQuestion + 1} of {questions.length}
              </Text>
              <Text type="secondary">
                Answered: {answeredCount}/{questions.length}
              </Text>
            </div>
          </div>

          {/* Question */}
          <Card style={{ marginBottom: "20px", backgroundColor: "#fafafa" }}>
            <Title level={4} style={{ marginBottom: "0" }}>
              {currentQuestion.question}
            </Title>
          </Card>

          {/* Options */}
          <div style={{ marginBottom: "30px" }}>
            <Radio.Group
              value={quizData.answers[currentQuestion.id]}
              onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
              style={{ width: "100%" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {currentQuestion.options.map((option, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "15px",
                      margin: "8px 0",
                      border: "1px solid",
                      borderColor: quizData.answers[currentQuestion.id] === idx ? "#1890ff" : "#d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: quizData.answers[currentQuestion.id] === idx ? "#e6f7ff" : "white",
                      cursor: "pointer"
                    }}
                    onClick={() => handleAnswerSelect(currentQuestion.id, idx)}
                  >
                    <Radio value={idx} style={{ width: "100%" }}>
                      <span style={{ fontSize: "16px" }}>{option}</span>
                    </Radio>
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>

          {/* Question Numbers */}
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "8px", 
            marginBottom: "30px",
            justifyContent: "center"
          }}>
            {questions.map((_, idx) => (
              <Button
                key={idx}
                type={quizData.currentQuestion === idx ? "primary" : 
                      quizData.answers[questions[idx].id] !== undefined ? "default" : "dashed"}
                shape="circle"
                size="small"
                onClick={() => setQuizData(prev => ({ ...prev, currentQuestion: idx }))}
              >
                {idx + 1}
              </Button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            padding: "20px 0",
            borderTop: "1px solid #f0f0f0"
          }}>
            <Button 
              onClick={() => {
                if (quizData.currentQuestion > 0) {
                  setQuizData(prev => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }));
                }
              }}
              disabled={quizData.currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div>
              <Text type="secondary" style={{ marginRight: "15px" }}>
                {answeredCount} of {questions.length} answered
              </Text>
            </div>
            
            {isLastQuestion ? (
              <Button 
                type="primary" 
                onClick={handleSubmitQuiz}
                disabled={answeredCount < questions.length}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button 
                type="primary" 
                onClick={() => {
                  setQuizData(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
                }}
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {!selectedCourse ? (
        <>
          <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
            {dict?.myCourses?.title || "Your Courses"}
          </Title>

          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col xs={24} md={12} key={course.id}>
                <Card
                  hoverable
                  style={{ borderRadius: "10px", cursor: "default" }}
                  cover={
                    <Image
                      alt={course.title}
                      src={course.image}
                      style={{ height: "10", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button
                      key="play"
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={() => setSelectedCourse(course)}
                    >
                      {dict?.buttons?.play || "Play"}
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={course.title}
                    description={course.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div>
          {/* Back Button */}
          <Button
            onClick={() => setSelectedCourse(null)}
            style={{ marginBottom: "15px" }}
          >
            ← {dict?.buttons?.back || "Back"}
          </Button>

          {/* Video Section */}
          <Title level={3}>{selectedCourse.title}</Title>
          <video
            controls
            src={selectedCourse.video}
            style={{
              width: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />

          {/* Tabs */}
          <Tabs
            defaultActiveKey="announcements"
            items={[
              {
                key: "announcements",
                label: (
                  <>
                    <NotificationOutlined />{" "}
                    {dict?.tabs?.announcements || "Announcements"}
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.announcements}
                    renderItem={(item: string) => (
                      <List.Item>{item}</List.Item>
                    )}
                  />
                ),
              },
              {
                key: "tests",
                label: (
                  <>
                    <ProfileOutlined />{" "}
                    {dict?.tabs?.tests || "Test Series"}
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.tests}
                    renderItem={(t: any) => {
                      const results = getTestResults();
                      const result = results[t.id];
                      
                      return (
                        <List.Item
                          actions={[
                            <Button
                              key="start"
                              type="primary"
                              onClick={() => handleStartTest(t)}
                            >                            
                              {dict?.buttons?.startTest || "Start Test"}
                            </Button>,
                            <Button 
                              key="view" 
                              onClick={() => handleViewResult(t.id)}
                              type={result ? "default" : "dashed"}
                            >
                              {dict?.buttons?.viewResult || "View Result"}
                              {result && (
                                <span style={{ 
                                  marginLeft: "8px", 
                                  fontWeight: "bold",
                                }}>
                                </span>
                              )}
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={t.name}
                            description={`${dict?.labels?.language || "Language"}: ${t.language}`}
                          />
                          {result && (
                            <div style={{ 
                              padding: "4px 12px",
                              backgroundColor: result.passed ? "#f6ffed" : "#fff2f0",
                              borderRadius: "4px",
                              border: `1px solid ${result.passed ? "#b7eb8f" : "#ffccc7"}`
                            }}>
                              <Text style={{ 
                                color: result.passed ? "#52c41a" : "#ff4d4f",
                                fontWeight: "bold"
                              }}>
                                {result.passed ? "✓ Passed" : "✗ Failed"}
                              </Text>
                            </div>
                          )}
                        </List.Item>
                      );
                    }}
                  />
                ),
              },
              {
                key: "pdfs",
                label: (
                  <>
                    <FilePdfOutlined />{" "}
                    {dict?.tabs?.pdfs || "Supporting PDFs"}
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.pdfs}
                    renderItem={(p: string) => (
                      <List.Item>
                        <a href={p} target="_blank" rel="noreferrer">
                          {p.split("/").pop()}
                        </a>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
          />
        </div>
      )}

      {/* Quiz Modal */}
      {renderQuizModal()}
      
      {/* Result Modal */}
      {renderResultModal()}
    </div>
  );
}