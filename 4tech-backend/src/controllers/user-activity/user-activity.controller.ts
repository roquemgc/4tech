import { Controller, UseGuards, Post, Get, Delete, UploadedFile, Body, UseInterceptors, Param, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path'
import { MediaCommentViewModel } from 'src/domain/viewmodel/media/media-comment.viewmodel'
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { LikeOrDislikeViewModel } from 'src/domain/viewmodel/media/like-or-deslike.viewmodel';

@UseGuards(AuthGuard('jwt'))
@Controller('user-activity')
export class UserActivityController {

    constructor(private readonly userActivityService: UserActivityService){
    }

    @Get(':index')// Retornar os posts
    getRecentImages( @Param('index') index: string) {
        return this.userActivityService.getRecentUploads(index);
    }

    @Post('upload')// Fazer um post
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: '../images/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }))
    postImage(
        @UploadedFile() file,
        @Body('userId') userId: string,
        @Body('description') description: string,
    ) {
        return this.userActivityService.postImage(userId, file.filename, description);
    }

    @Put('like-or-dislike')
    likeOrDislikeUserActivity(@Body() likeOrDislikeViewModel: LikeOrDislikeViewModel) {
        return this.userActivityService.likeOrDislikeMedia(likeOrDislikeViewModel)
    }

    @Put('comment-in-activity')
    postCommentInActivity(@Body() postComment: MediaCommentViewModel) {
        return this.userActivityService.postComment(postComment);
    }
    
    @Delete('delete')
    deletePost(@Param('activityId') activityId: string ) {
        console.log(activityId);
    }
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
