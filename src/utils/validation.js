import Joi from 'joi'


export const AvatarScheme = Joi.object({
    title: Joi.string().min(2).max(200).required(),
    avatar: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)).error(new Error('Image format is ERROR'))
})