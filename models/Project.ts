import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  imageUrl: {
    type: String,
    required: true,
  },
  liveUrl: String,
  githubUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
