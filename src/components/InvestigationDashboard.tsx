import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { ClientInfoSection } from './dashboard/ClientInfoSection';
import { InvestigatedInfoSection } from './dashboard/InvestigatedInfoSection';
import { MandateDetailsSection } from './dashboard/MandateDetailsSection';
import { ObservationDaysSection } from './dashboard/ObservationDaysSection';
import { PhotosSection } from './dashboard/PhotosSection';
import { AdditionalNotesSection } from './dashboard/AdditionalNotesSection';
import { PhotoManagementSection } from './dashboard/PhotoManagementSection';
import { ConclusionsSection } from './dashboard/ConclusionsSection';
import { PrivacySection } from './dashboard/PrivacySection';
import { ReportPreview } from './dashboard/ReportPreview';
import { useInvestigationData } from '@/hooks/useInvestigationData';

export const InvestigationDashboard = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, updateData, resetData } = useInvestigationData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleExportPDF = () => {
    // PDF export logic will be implemented
    console.log('Exporting PDF...', data);
  };

  const getCompletionStats = () => {
    const sections = [
      data.clientInfo.fullName,
      data.investigatedInfo.fullName,
      data.mandateDetails.assignmentDate,
      data.observationDays.length > 0,
      data.conclusions.text
    ];
    const completed = sections.filter(Boolean).length;
    return { completed, total: sections.length, percentage: Math.round((completed / sections.length) * 100) };
  };

  const stats = getCompletionStats();

  const getStatusIcon = () => {
    if (stats.percentage === 100) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (stats.percentage >= 50) return <Clock className="w-5 h-5 text-blue-600" />;
    return <AlertCircle className="w-5 h-5 text-amber-600" />;
  };

  const getStatusText = () => {
    if (stats.percentage === 100) return "Relazione Completa";
    if (stats.percentage >= 50) return "In Corso";
    return "Da Iniziare";
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-stone-50 via-stone-25 to-stone-100 transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Enhanced Header */}
      <header className="glass-effect border-b shadow-sm sticky top-0 z-50" style={{ backgroundColor: 'rgb(250, 248, 246, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 slide-in-up">
              <div className="w-12 h-12 falco-gradient rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-falco-dark">Falco Investigation</h1>
                <p className="text-slate-600">Dashboard Relazioni Investigative</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border" style={{ backgroundColor: 'rgb(245, 242, 237)', borderColor: 'rgb(231, 229, 228)' }}>
                {getStatusIcon()}
                <span className="text-sm font-medium">{getStatusText()}</span>
              </div>
              <Badge variant="outline" className="border-stone-300 text-slate-700" style={{ backgroundColor: 'rgb(250, 248, 246)' }}>
                {stats.percentage}% Completato
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 floating-button border-stone-300 hover:bg-stone-100"
                style={{ backgroundColor: 'rgb(250, 248, 246)' }}
              >
                <Eye className="w-4 h-4" />
                <span>Anteprima</span>
              </Button>
              <Button
                onClick={handleExportPDF}
                className="falco-gradient text-white hover:opacity-90 flex items-center space-x-2 floating-button"
              >
                <Download className="w-4 h-4" />
                <span>Esporta PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showPreview ? (
          <div className="fade-in">
            <ReportPreview data={data} onClose={() => setShowPreview(false)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content with staggered animations */}
            <div className="lg:col-span-2 space-y-6">
              <div className="stagger-item">
                <ClientInfoSection 
                  data={data.clientInfo} 
                  onUpdate={(clientInfo) => updateData({ clientInfo })} 
                />
              </div>
              
              <div className="stagger-item">
                <InvestigatedInfoSection 
                  data={data.investigatedInfo} 
                  onUpdate={(investigatedInfo) => updateData({ investigatedInfo })} 
                />
              </div>
              
              <div className="stagger-item">
                <MandateDetailsSection 
                  data={data.mandateDetails} 
                  onUpdate={(mandateDetails) => updateData({ mandateDetails })} 
                />
              </div>

              <div className="stagger-item">
                <PhotoManagementSection 
                  data={data.photoManagement} 
                  onUpdate={(photoManagement) => updateData({ photoManagement })} 
                />
              </div>
              
              <div className="stagger-item">
                <ObservationDaysSection 
                  data={data.observationDays} 
                  onUpdate={(observationDays) => updateData({ observationDays })} 
                />
              </div>
              
              <div className="stagger-item">
                <PhotosSection 
                  data={data.photos} 
                  onUpdate={(photos) => updateData({ photos })} 
                />
              </div>
              
              <div className="stagger-item">
                <AdditionalNotesSection 
                  data={data.additionalNotes} 
                  onUpdate={(additionalNotes) => updateData({ additionalNotes })} 
                />
              </div>
              
              <div className="stagger-item">
                <ConclusionsSection 
                  data={data.conclusions} 
                  onUpdate={(conclusions) => updateData({ conclusions })} 
                />
              </div>
              
              <div className="stagger-item">
                <PrivacySection 
                  data={data.privacy} 
                  onUpdate={(privacy) => updateData({ privacy })} 
                />
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    {getStatusIcon()}
                    <span>Stato Relazione</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Progresso Compilazione</span>
                    <span className="text-sm font-medium text-falco-navy">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="progress-bar h-3">
                    <div 
                      className="progress-fill"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetData}
                      className="w-full floating-button hover:bg-stone-100 border-stone-300"
                      style={{ backgroundColor: 'rgb(250, 248, 246)' }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nuova Relazione
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg">Guida Professionale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-3">
                    {[
                      "Compila le informazioni cliente",
                      "Inserisci dati dell'investigato", 
                      "Specifica dettagli del mandato",
                      "Configura gestione foto",
                      "Aggiungi giorni di osservazione",
                      "Carica foto e documenti",
                      "Aggiungi note extra se necessario",
                      "Scrivi le conclusioni",
                      "Esporta la relazione finale"
                    ].map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 p-2 rounded-lg beige-hover transition-colors duration-200"
                      >
                        <div className="w-6 h-6 bg-falco-navy/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-falco-navy">{index + 1}</span>
                        </div>
                        <p className="text-slate-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg">Statistiche Rapide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'rgb(245, 242, 237)' }}>
                      <div className="text-2xl font-bold text-falco-navy">{data.observationDays.length}</div>
                      <div className="text-xs text-slate-600">Giorni Osservazione</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{data.photos.length}</div>
                      <div className="text-xs text-slate-600">Foto Caricate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};