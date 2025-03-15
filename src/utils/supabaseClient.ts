import { createClient } from '@supabase/supabase-js';
import type { Project } from '@/types/project';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getFileUrl(path: string): Promise<string> {
  try {
    const { data } = supabase.storage.from('applications').getPublicUrl(path);

    if (!data?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data: featuredCheck, error: featuredError } = await supabase
      .from('projects')
      .select('featured')
      .limit(1);

    const hasFeaturedColumn =
      !featuredError &&
      featuredCheck &&
      featuredCheck.length > 0 &&
      'featured' in featuredCheck[0];

    const { data, error } = await supabase.from('projects').select('*');

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.sort((a, b) => {
      if (hasFeaturedColumn) {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }

      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order;
      }

      if (a.created_at && b.created_at) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      return typeof a.id === 'number' && typeof b.id === 'number'
        ? b.id - a.id
        : String(a.id).localeCompare(String(b.id));
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProjectById(
  id: string | number
): Promise<Project | null> {
  try {
    let query;

    if (typeof id === 'string') {
      query = supabase.from('projects').select('*').eq('slug', id).single();
    } else {
      query = supabase.from('projects').select('*').eq('id', id).single();
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
}

export async function createProject(
  project: Omit<Project, 'id'>
): Promise<Project> {
  try {
    const projectToInsert = {
      ...project,
      active: project.active !== undefined ? project.active : true,
      featured: project.featured !== undefined ? project.featured : false,
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(projectToInsert)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create project: No data returned');
    }

    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(
  id: string | number,
  project: Partial<Project>
): Promise<Project> {
  try {
    let query;

    if (typeof id === 'string') {
      query = supabase
        .from('projects')
        .update(project)
        .eq('slug', id)
        .select()
        .single();
    } else {
      query = supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single();
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error(
        `Failed to update project with id ${id}: No data returned`
      );
    }

    return data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
}
