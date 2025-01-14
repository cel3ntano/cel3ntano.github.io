export interface HRConfig {
  name: string;
  filePath: string;
  title: string;
  company: string;
  downloadName: string;
}

export const HR_CONFIGS: Record<string, HRConfig> = {
  vb14125: {
    name: 'Valentyna',
    filePath: 'Valentyna_Boiko/Excited_to_Connect_Message.pdf',
    title: 'Andrii Zhygalko - Connection with Valentyna',
    company: 'ExtTech Development',
    downloadName: 'Andrii_Zhygalko_Message_to_Valentyna.pdf',
  },
  ks14125: {
    name: 'Kateryna',
    filePath: 'Kateryna_Solomenchuk/Excited_to_Connect_Message.pdf',
    title: 'Andrii Zhygalko - Application for Company',
    company: 'Eddy LMS',
    downloadName: 'Andrii_Zhygalko_Application.pdf',
  },
};
