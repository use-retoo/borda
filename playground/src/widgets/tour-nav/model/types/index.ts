/** A single tour entry in the navigation. */
export interface TourNavEntry {
	label: string;
	start: () => void;
}

/** A named group of related tour entries. */
export interface TourNavGroup {
	label: string;
	tours: TourNavEntry[];
}

/** Props accepted by the TourNav widget. */
export interface TourNavProps {
	groups: TourNavGroup[];
}

/** Event callbacks for the TourNav widget. */
export interface TourNavEvents {
	onClearSkip: () => void;
}
