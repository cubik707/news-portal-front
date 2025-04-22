import styles from './user-info.module.scss'
import { UserForNews } from '../types/user.types.ts';

type UserInfoProps = UserForNews & {
  additionalText: string
}

export const UserInfo = ({ avatarUrl, fullName, additionalText }: UserInfoProps) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};