import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/mongo/repositories/user-repository';
import { UserActivityCommentDto } from 'src/domain/dto/user-activit-comment.dto';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityRepository } from 'src/mongo/repositories/user-activity.repository';
import { UserActivity } from 'src/mongo/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { MediaCommentViewModel } from 'src/domain/viewmodel/media/media-comment.viewmodel'
import { LikeOrDislikeViewModel } from 'src/domain/viewmodel/media/like-or-deslike.viewmodel';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { isNull } from 'util';

@Injectable()
export class UserActivityService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository,
        private readonly webSocketGateway: WebsocketGateway){
    }

    async getRecentUploads(index: string){
        const indexAsNumber = parseInt(index, 10);
        
        if(isNaN(indexAsNumber)) { // is Not a Number()
            throw new BadRequestException('Invalid index');
        }
        
        const recentUploads = await this.userActivityRepository.getPaged(indexAsNumber);
        return await this.convertImagesToBase64(recentUploads);
    }

    async likeOrDislikeMedia(likeOrDislikeViewModel: LikeOrDislikeViewModel){
        
        const userActivity = await this.userActivityRepository.getById(likeOrDislikeViewModel.userActivityId);
        if(!userActivity){
            throw new BadRequestException('An user activity with the given id does not exist');
        }
        
        const user = await this.userRepository.getById(likeOrDislikeViewModel.userId);
        if(!user){
            throw new BadRequestException('An user with the given ID does not exists');
        }

        if(userActivity.likes.includes(user._id.toString())){
            userActivity.likes = userActivity.likes.filter(x => x !== user._id.toString());
        }else {
            userActivity.likes.push(user._id.toString());
        }

        const updatedUserActivity = await this.userActivityRepository.update(userActivity);
        this.webSocketGateway.notifyOnLike(userActivity._id, userActivity.userId);
    }
    

    async postImage(userId: string, fileName: string, description: string){

        const user = await this.userRepository.getById(userId);
        if(!user){ 
            throw new BadRequestException('This user does not exists');
        }

        const uploadImageObj = new UserActivityDto(userId, fileName, user.userName);

        if(description){
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId, user.userName, description ));
        }

        const createdUserActivity = await this.userActivityRepository.create(uploadImageObj);

        return this.convertImageToBase64ForOneFile(createdUserActivity);
    }
    
    convertImagesToBase64(userActivities: UserActivity[]){
        return Promise.all(
            userActivities.map(userActivity =>{
                return {
                    ...userActivity, 
                    imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64')
                };
            }),
        );
    }

    convertImageToBase64ForOneFile(userActivity: UserActivity){
        return {
            ...userActivity,
            imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
        };
    }

    async postComment(postCommentDto: MediaCommentViewModel) {
        const post = await this.userActivityRepository.getById(postCommentDto.mediaId);
        if (isNull(post)) { throw new BadRequestException('A Post with the given PostId could not be found'); }

        const user = await this.userRepository.getById(postCommentDto.userId);
        if (isNull(user)) { throw new BadRequestException('An user with the given UserId was not found '); }

        post.comments = post.comments.concat(new MediaCommentViewModel(postCommentDto.userId, user.userName, postCommentDto.comment));

        const updated = await this.userActivityRepository.update(post);

        return updated.mediaComments.pop();
    }
}
