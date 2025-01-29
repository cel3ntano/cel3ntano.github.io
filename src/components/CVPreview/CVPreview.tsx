import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import clsx from 'clsx';
import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer.mjs';
import 'pdfjs-dist/web/pdf_viewer.css';
import { getFileUrl } from '@/utils/supabaseClient';
import { CV_CONFIG } from '@/data/cvConfig';
import css from './CVPreview.module.css';
import { PDFViewer, PDFViewerOptions } from '@/types/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function CVPreview(): JSX.Element | null {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PDFViewer | null>(null);
  const initialized = useRef<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();

  useEffect(() => {
    document.title = CV_CONFIG.title;

    getFileUrl(CV_CONFIG.filePath)
      .then((url: string) => {
        setPdfUrl(url);
      })
      .catch((error: Error) => {
        console.error('Error fetching PDF URL:', error);
      });
  }, []);

  useEffect(() => {
    if (!pdfUrl) return;

    async function initializeViewer(): Promise<(() => void) | undefined> {
      if (initialized.current || !containerRef.current) return;

      try {
        const viewerContainer =
          containerRef.current.querySelector<HTMLDivElement>(
            '.pdfViewerContainer'
          );
        if (!viewerContainer) throw new Error('Viewer container not found');

        const existingViewer = viewerContainer.querySelector('.pdfViewer');
        if (existingViewer) {
          existingViewer.remove();
        }

        const viewerDiv = document.createElement('div');
        viewerDiv.className = 'pdfViewer';
        viewerContainer.appendChild(viewerDiv);

        const eventBus = new pdfjsViewer.EventBus();
        const pdfLinkService = new pdfjsViewer.PDFLinkService({ eventBus });
        const pdfFindController = new pdfjsViewer.PDFFindController({
          eventBus,
          linkService: pdfLinkService,
        });

        const pdfViewer = new pdfjsViewer.PDFViewer({
          container: viewerContainer,
          eventBus,
          linkService: pdfLinkService,
          findController: pdfFindController,
          l10n: undefined,
          textLayerMode: 2,
        } as PDFViewerOptions) as PDFViewer;

        viewerRef.current = pdfViewer;
        pdfLinkService.setViewer(pdfViewer);

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        pdfViewer.setDocument(pdf);
        pdfLinkService.setDocument(pdf);

        const setResponsiveScale = (): void => {
          if (!viewerRef.current?.pagesCount) return;

          try {
            if (window.innerWidth <= 480) {
              viewerRef.current.currentScaleValue = 'page-fit';
            } else if (window.innerWidth <= 768) {
              viewerRef.current.currentScaleValue = 'page-width';
            } else {
              viewerRef.current.currentScale = 1;
            }
          } catch (error) {
            console.error('Error setting scale:', error);
          }
        };

        window.addEventListener('resize', setResponsiveScale);
        eventBus.on('pagesloaded', () => {
          setTimeout(setResponsiveScale, 100);
        });

        initialized.current = true;
        return () => {
          window.removeEventListener('resize', setResponsiveScale);
        };
      } catch (error) {
        console.error('Error initializing PDF viewer:', error);
        return undefined;
      }
    }

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.cleanup?.();
      }
      viewerRef.current = null;
      initialized.current = false;
    };
  }, [pdfUrl]);

  const handleDownload = async (): Promise<void> => {
    if (!pdfUrl) return;

    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = CV_CONFIG.downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!pdfUrl) return null;

  return (
    <div className={css.container}>
      <header className={clsx(css.header)}>
        <div className={clsx(css.toolbar)}>
          <Link to='/' className={css.backLink}>
            <span className={css.backSymbol}>{'<'}</span>
            <span className={css.backButton}>{'Portfolio'}</span>
          </Link>
          <h1 className={css.title}>CV Preview</h1>
          <button
            onClick={handleDownload}
            className={clsx(css.button, 'button')}
            type='button'>
            <span className={css.buttonText}>Download PDF</span>
            <Download className={css.buttonIcon} size={20} />
          </button>
        </div>
      </header>
      <div ref={containerRef} className={css.pdfContainer}>
        <div className='pdfViewerContainer'>
          <div className='pdfViewer' />
        </div>
      </div>
    </div>
  );
}
