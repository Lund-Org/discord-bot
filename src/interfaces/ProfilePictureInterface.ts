import { User } from "discord.js";

export default interface ProfilePictureInterface {
  user: User | null;
  nearestUsers: User[];
}
