type Area = {
    state?: string;
    county?: string
  };

type Severity = "Minor" | "Moderate" | "Severe" | "Extreme";

type Alert = {
    id: string | number; 
    active: boolean;
    areas: Area[];
    geocode: string | string[];
    senderName: string;
    headline: string;
    sent: string;
    effective: string;
    eventStartTime: string;
    expires: string;
    eventEndTime: string;
    status: string; 
    category: string; 
    severity: Severity; 
    certainty: string; 
    urgency: string;
    event: string; 
    sender: string;
  };

type Preferences = Area & {
  severity: Severity | null; 
};
  
  export {Alert,Severity,Preferences}