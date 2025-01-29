import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.mjs';

export interface PDFViewerOptions {
  container: HTMLDivElement;
  eventBus: pdfjsViewer.EventBus;
  linkService: pdfjsViewer.PDFLinkService;
  findController: pdfjsViewer.PDFFindController;
  l10n: undefined;
  textLayerMode: number;
}

export interface PDFViewer {
  cleanup?: () => void;
  currentScale: number;
  currentScaleValue: string;
  pagesCount?: number;
  setDocument: (pdf: pdfjsLib.PDFDocumentProxy) => void;
}
