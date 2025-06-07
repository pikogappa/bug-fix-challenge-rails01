class Apps::ProfilesController < Apps::ApplicationController

    def show
        @profile = current_user.profile
        @articles = current_user.articles
    end

    def edit
        # if current_user.profile.present?
        #     @profile = current_user.profile
        # else
        #     @profile = current_user.build_profile
        # end
        @profile = current_user.prepare_profile
    end

    def update
        @profile = current_user.prepare_profile
        @profile.assign_attributes(profile_params)
        if @profile.save
            redirect_to profile_path, notice: 'プロフィール更新！'
        else
            flash.now[:error] = '更新に失敗しました'
            render :edit
        end
    end

    private
    def profile_params
        params.require(:profile).permit(
            :nickname,
            :introduction,
            :gender,
            :birthday,
            :subscribed,
            :avatar
        )
    end
end