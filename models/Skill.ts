import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  level: number;
  icon: string;
  order: number;
  createdAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  icon: {
    type: String,
    default: 'Code',
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

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
