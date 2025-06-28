import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Plus, CheckCircle, Clock, AlertCircle, Shield, Search } from 'lucide-react';
import { ClientInfoSection } from './dashboard/ClientInfoSection';
import { InvestigatedInfoSection } from './dashboard/InvestigatedInfoSection';
import { MandateDetailsSection } from './dashboard/MandateDetailsSection';
import { ObservationDaysSection } from './dashboard/ObservationDaysSection';
import { PhotosSection } from './dashboard/PhotosSection';
import { GamblingActivitiesSection } from './dashboard/GamblingActivitiesSection';
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
    if (stats.percentage === 100) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (stats.percentage >= 50) return <Clock className="w-5 h-5 text-blue-400" />;
    return <AlertCircle className="w-5 h-5 text-amber-400" />;
  };

  const getStatusText = () => {
    if (stats.percentage === 100) return "Relazione Completa";
    if (stats.percentage >= 50) return "In Corso";
    return "Da Iniziare";
  };

  const getStatusClass = () => {
    if (stats.percentage === 100) return "status-complete";
    if (stats.percentage >= 50) return "status-progress";
    return "status-pending";
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
      {/* Professional Investigative Header */}
      <header className="glass-effect border-b shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 slide-in-up">
              <div className="w-12 h-12 falco-gradient rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Falco Investigation</h1>
                <p className="text-slate-300 flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Dashboard Relazioni Investigative</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${getStatusClass()}`}>
                {getStatusIcon()}
                <span className="text-sm font-medium text-white">{getStatusText()}</span>
              </div>
              <Badge className="professional-badge">
                {stats.percentage}% Completato
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="floating-button flex items-center space-x-2"
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
                <GamblingActivitiesSection 
                  data={data.gamblingActivities} 
                  onUpdate={(gamblingActivities) => updateData({ gamblingActivities })} 
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

            {/* Enhanced Professional Sidebar */}
            <div className="space-y-6">
              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2 text-slate-100">
                    {getStatusIcon()}
                    <span>Stato Relazione</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Progresso Compilazione</span>
                    <span className="text-sm font-medium text-blue-400">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="progress-bar">
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
                      className="w-full floating-button"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nuova Relazione
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-100">Guida Professionale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-3">
                    {[
                      "Compila le informazioni cliente",
                      "Inserisci dati dell'investigato", 
                      "Specifica dettagli del mandato",
                      "Configura gestione foto",
                      "Aggiungi giorni di osservazione",
                      "Documenta attività di gioco (se rilevanti)",
                      "Carica foto e documenti",
                      "Aggiungi note extra se necessario",
                      "Scrivi le conclusioni",
                      "Esporta la relazione finale"
                    ].map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-3 p-3 rounded-lg professional-hover"
                      >
                        <div className={`step-indicator ${index < stats.completed ? 'active' : ''}`}>
                          {index + 1}
                        </div>
                        <p className="text-slate-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Professional Stats Card */}
              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-100">Statistiche Investigative</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 professional-accent rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{data.observationDays.length}</div>
                      <div className="text-xs text-slate-300">Giorni Osservazione</div>
                    </div>
                    <div className="text-center p-4 professional-accent rounded-lg">
                      <div className="text-2xl font-bold text-cyan-400">{data.photos.length}</div>
                      <div className="text-xs text-slate-300">Foto Caricate</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 professional-accent rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{data.gamblingActivities.length}</div>
                      <div className="text-xs text-slate-300">Attività Gioco</div>
                    </div>
                    <div className="text-center p-4 professional-accent rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">{data.investigatedInfo.vehicles.length}</div>
                      <div className="text-xs text-slate-300">Veicoli Monitorati</div>
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