
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Plus } from 'lucide-react';
import { ClientInfoSection } from './dashboard/ClientInfoSection';
import { InvestigatedInfoSection } from './dashboard/InvestigatedInfoSection';
import { MandateDetailsSection } from './dashboard/MandateDetailsSection';
import { ObservationDaysSection } from './dashboard/ObservationDaysSection';
import { PhotosSection } from './dashboard/PhotosSection';
import { GamblingActivitiesSection } from './dashboard/GamblingActivitiesSection';
import { ConclusionsSection } from './dashboard/ConclusionsSection';
import { PrivacySection } from './dashboard/PrivacySection';
import { ReportPreview } from './dashboard/ReportPreview';
import { useInvestigationData } from '@/hooks/useInvestigationData';

export const InvestigationDashboard = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { data, updateData, resetData } = useInvestigationData();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 falco-gradient rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-falco-dark">Falco Investigation</h1>
                <p className="text-slate-600">Dashboard Relazioni Investigative</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="gold-accent">
                Completamento: {stats.percentage}%
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Anteprima</span>
              </Button>
              <Button
                onClick={handleExportPDF}
                className="falco-gradient text-white hover:opacity-90 flex items-center space-x-2"
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
          <ReportPreview data={data} onClose={() => setShowPreview(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ClientInfoSection 
                data={data.clientInfo} 
                onUpdate={(clientInfo) => updateData({ clientInfo })} 
              />
              
              <InvestigatedInfoSection 
                data={data.investigatedInfo} 
                onUpdate={(investigatedInfo) => updateData({ investigatedInfo })} 
              />
              
              <MandateDetailsSection 
                data={data.mandateDetails} 
                onUpdate={(mandateDetails) => updateData({ mandateDetails })} 
              />
              
              <ObservationDaysSection 
                data={data.observationDays} 
                onUpdate={(observationDays) => updateData({ observationDays })} 
              />
              
              <PhotosSection 
                data={data.photos} 
                onUpdate={(photos) => updateData({ photos })} 
              />
              
              <GamblingActivitiesSection 
                data={data.gamblingActivities} 
                onUpdate={(gamblingActivities) => updateData({ gamblingActivities })} 
              />
              
              <ConclusionsSection 
                data={data.conclusions} 
                onUpdate={(conclusions) => updateData({ conclusions })} 
              />
              
              <PrivacySection 
                data={data.privacy} 
                onUpdate={(privacy) => updateData({ privacy })} 
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg">Stato Relazione</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Progresso</span>
                    <span className="text-sm font-medium">{stats.completed}/{stats.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="falco-gradient h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetData}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nuova Relazione
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="section-card">
                <CardHeader>
                  <CardTitle className="text-lg">Guida Rapida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <p className="text-slate-600">1. Compila le informazioni cliente</p>
                    <p className="text-slate-600">2. Inserisci dati dell'investigato</p>
                    <p className="text-slate-600">3. Specifica dettagli del mandato</p>
                    <p className="text-slate-600">4. Aggiungi giorni di osservazione</p>
                    <p className="text-slate-600">5. Carica foto e documenti</p>
                    <p className="text-slate-600">6. Scrivi le conclusioni</p>
                    <p className="text-slate-600">7. Esporta la relazione</p>
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
