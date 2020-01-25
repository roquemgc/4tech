import { FileInterceptor } from '@nestjs/platform-express'
import { Controller, UseGuards, Post, Get, UploadedFile, Body, UseInterceptors, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { LikeOrDislikeViewModel } from 'src/domain/viewmodel/like-or-deslike.viewmodel';

@UseGuards(AuthGuard('jwt'))
@Controller('user-activity')
export class UserActivityController {

    constructor(private readonly userActivityService: UserActivityService){
    }

    @Get(':index')
    getRecentImages( @Param('index') index: string) {
        return this.userActivityService.getRecentUploads(index);
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: '../images/',
                filename: (req, file, callback) => { callback(null, file.originalname); }
            }),
        }),
    )

    postImage(
        @UploadedFile() file,
        @Body('userId') userId: string,
        @Body('description') description: string,
    ) {
        return this.userActivityService.uploadImage(userId, file.originalname, description);
    }

    @Put('like-or-dislike')
    likeOrDislikeUserActivity(@Body() likeOrDislikeViewModel: LikeOrDislikeViewModel) {
        console.log(likeOrDislikeViewModel.userActivityId);
        return this.userActivityService.likeOrDislikeUserActivity(likeOrDislikeViewModel)
    }
}
