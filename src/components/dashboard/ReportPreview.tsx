
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, Download, FileText } from 'lucide-react';
import { InvestigationData } from '@/hooks/useInvestigationData';

interface ReportPreviewProps {
  data: InvestigationData;
  onClose: () => void;
}

export const ReportPreview = ({ data, onClose }: ReportPreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 falco-gradient rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold">Anteprima Relazione Investigativa</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="falco-gradient text-white">
              <Download className="w-4 h-4 mr-2" />
              Esporta PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 falco-gradient rounded-xl mx-auto flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-falco-dark">FALCO INVESTIGATION</h1>
              <h2 className="text-xl font-semibold text-slate-700">Relazione Investigativa Confidenziale</h2>
              <p className="text-sm text-slate-500">
                Data di compilazione: {new Date().toLocaleDateString('it-IT')}
              </p>
            </div>

            <Separator />

            {/* Client Info */}
            {data.clientInfo.fullName && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">INFORMAZIONI CLIENTE</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Nome:</span> {data.clientInfo.fullName}</div>
                  <div><span className="font-medium">Indirizzo:</span> {data.clientInfo.address}</div>
                  {data.clientInfo.birthDate && (
                    <div><span className="font-medium">Data di nascita:</span> {formatDate(data.clientInfo.birthDate)}</div>
                  )}
                  {data.clientInfo.birthPlace && (
                    <div><span className="font-medium">Luogo di nascita:</span> {data.clientInfo.birthPlace}</div>
                  )}
                  {data.clientInfo.documentNumber && (
                    <div><span className="font-medium">{data.clientInfo.documentType}:</span> {data.clientInfo.documentNumber}</div>
                  )}
                </div>
              </div>
            )}

            {/* Investigated Info */}
            {data.investigatedInfo.fullName && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">SOGGETTO INVESTIGATO</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Nome:</span> {data.investigatedInfo.fullName}</div>
                  <div><span className="font-medium">Indirizzo:</span> {data.investigatedInfo.address}</div>
                  {data.investigatedInfo.birthDate && (
                    <div><span className="font-medium">Data di nascita:</span> {formatDate(data.investigatedInfo.birthDate)}</div>
                  )}
                  {data.investigatedInfo.birthPlace && (
                    <div><span className="font-medium">Luogo di nascita:</span> {data.investigatedInfo.birthPlace}</div>
                  )}
                </div>
                
                {data.investigatedInfo.vehicles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Veicoli utilizzati:</h4>
                    {data.investigatedInfo.vehicles.map((vehicle, index) => (
                      <div key={index} className="text-sm ml-4">
                        • {vehicle.model} {vehicle.color} - Targa: {vehicle.licensePlate}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Mandate Details */}
            {data.mandateDetails.assignmentDate && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">DETTAGLI MANDATO</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Data conferimento:</span> {formatDate(data.mandateDetails.assignmentDate)}</div>
                  <div><span className="font-medium">Tipo indagine:</span> {data.mandateDetails.investigationType}</div>
                  {data.mandateDetails.purpose && (
                    <div><span className="font-medium">Finalità:</span> {data.mandateDetails.purpose}</div>
                  )}
                  {data.mandateDetails.protectedRights && (
                    <div><span className="font-medium">Diritti tutelati:</span> {data.mandateDetails.protectedRights}</div>
                  )}
                </div>
              </div>
            )}

            {/* Observation Days */}
            {data.observationDays.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">ATTIVITÀ DI OSSERVAZIONE</h3>
                {data.observationDays.map((day, index) => (
                  <div key={day.id} className="border-l-4 border-falco-navy pl-4 space-y-2">
                    <h4 className="font-medium">Giorno {index + 1} - {formatDate(day.date)}</h4>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Orario:</span> {formatTime(day.startTime)} - {formatTime(day.endTime)}</div>
                      {day.locations.length > 0 && (
                        <div>
                          <span className="font-medium">Luoghi visitati:</span>
                          {day.locations.map((location, i) => (
                            <div key={i} className="ml-4">• {location.placeName} - {location.address}</div>
                          ))}
                        </div>
                      )}
                      {day.description && (
                        <div><span className="font-medium">Descrizione:</span> {day.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gambling Activities */}
            {data.gamblingActivities.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">ATTIVITÀ DI GIOCO E SCOMMESSE</h3>
                {data.gamblingActivities.map((activity, index) => (
                  <div key={activity.id} className="border-l-4 border-amber-500 pl-4 space-y-2">
                    <h4 className="font-medium">{activity.location}</h4>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Indirizzo:</span> {activity.address}</div>
                      <div><span className="font-medium">Orario:</span> {formatTime(activity.startTime)} - {formatTime(activity.endTime)}</div>
                      {activity.description && (
                        <div><span className="font-medium">Descrizione:</span> {activity.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Photos */}
            {data.photos.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">DOCUMENTAZIONE FOTOGRAFICA</h3>
                <div className="text-sm">
                  <p>Numero di foto allegate: {data.photos.length}</p>
                  <p className="text-slate-600 mt-2">
                    Le foto sono conservate in formato digitale e disponibili su richiesta per consultazione.
                  </p>
                </div>
              </div>
            )}

            {/* Conclusions */}
            {data.conclusions.text && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-falco-navy">CONCLUSIONI</h3>
                <div className="text-sm whitespace-pre-wrap">{data.conclusions.text}</div>
              </div>
            )}

            {/* Privacy */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-falco-navy">PRIVACY E RISERVATEZZA</h3>
              <div className="text-sm space-y-2">
                <p>{data.privacy.standardMessage}</p>
                {data.privacy.customNotes && (
                  <p className="mt-2">{data.privacy.customNotes}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-4 pt-8 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                <p>Falco Investigation - Agenzia Investigativa Professionale</p>
                <p>Relazione redatta in conformità alla normativa vigente</p>
              </div>
              <div className="text-xs text-slate-500">
                <p>Documento confidenziale - Vietata la riproduzione e divulgazione a terzi non autorizzati</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
