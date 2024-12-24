import { useState, useEffect } from 'react';
import css from './EnhancedObserverDebug.module.css';

interface SectionData {
  id: string;
  ratio: number;
  isIntersecting: boolean;
}

interface EnhancedObserverDebugProps {
  topMargin?: string;
  bottomMargin?: string;
  isVisible?: boolean;
}

export default function EnhancedObserverDebug({
  topMargin = '-40%',
  bottomMargin = '-50%',
  isVisible = true,
}: EnhancedObserverDebugProps) {
  const [dimensions, setDimensions] = useState({
    viewportHeight: 0,
    topHeight: 0,
    bottomHeight: 0,
  });
  const [sections, setSections] = useState<SectionData[]>([]);

  // Set up dimensions and create observer
  useEffect(() => {
    const updateDimensions = () => {
      const viewportHeight = window.innerHeight;
      const topHeight = (Math.abs(parseInt(topMargin)) * viewportHeight) / 100;
      const bottomHeight =
        (Math.abs(parseInt(bottomMargin)) * viewportHeight) / 100;

      setDimensions({
        viewportHeight,
        topHeight,
        bottomHeight,
      });
    };

    // Create observer to track all sections
    const observer = new IntersectionObserver(
      entries => {
        setSections(prevSections => {
          const updatedSections = [...prevSections];

          entries.forEach(entry => {
            const index = updatedSections.findIndex(
              s => s.id === entry.target.id
            );
            const newData = {
              id: entry.target.id,
              ratio: entry.intersectionRatio,
              isIntersecting: entry.isIntersecting,
            };

            if (index === -1) {
              updatedSections.push(newData);
            } else {
              updatedSections[index] = newData;
            }
          });

          return updatedSections;
        });
      },
      {
        rootMargin: `${topMargin} 0px ${bottomMargin} 0px`,
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // Generate thresholds [0, 0.05, 0.1, ..., 1]
      }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [topMargin, bottomMargin]);

  if (!isVisible) return null;

  const observableHeight =
    dimensions.viewportHeight - dimensions.topHeight - dimensions.bottomHeight;

  return (
    <div className={css.overlay}>
      {/* Top transition zone */}
      <div className={css.topZone} style={{ height: dimensions.topHeight }}>
        <div className={css.zoneLabel}>
          Top Transition Zone ({topMargin})
          <br />
          Elements here begin to intersect
        </div>
      </div>

      {/* Primary observable area */}
      <div
        className={css.observableArea}
        style={{
          top: dimensions.topHeight,
          height: observableHeight,
        }}>
        <div className={css.observableLabel}>
          Primary Observable Area
          <br />
          Maximum intersection occurs here
        </div>
      </div>

      {/* Bottom transition zone */}
      <div
        className={css.bottomZone}
        style={{
          top: dimensions.topHeight + observableHeight,
          height: dimensions.bottomHeight,
        }}>
        <div className={css.zoneLabel}>
          Bottom Transition Zone ({bottomMargin})
          <br />
          Elements begin to exit here
        </div>
      </div>

      {/* Real-time section information */}
      <div className={css.sectionInfo}>
        <h4>Section Intersection Ratios</h4>
        {sections.map(section => (
          <div key={section.id} className={css.sectionItem}>
            <div
              className={`${css.sectionName} ${
                section.isIntersecting ? css.active : ''
              }`}>
              {section.id}
            </div>
            <div>Ratio: {(section.ratio * 100).toFixed(1)}%</div>
            <div className={css.ratioBar}>
              <div
                className={css.ratioFill}
                style={{ width: `${section.ratio * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
