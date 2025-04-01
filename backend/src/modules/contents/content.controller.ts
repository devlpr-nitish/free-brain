import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../users/user.middleware";
import { ContentModel, objectIdSchema, Validatecontent } from "./content.schema";
import { DefaultTypeModel, TypeModel } from "../Types/type.schema";




export default class ContentController{
    async getAll(req:AuthRequest, res:Response, next:NextFunction){
        try {
            const userId = req.userId;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const contents = await ContentModel.find({userId});
            
            return res.status(200).json({
                success: true,
                contents
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while fetching contents",
            });
        }
    }

    async addContent(req:AuthRequest, res:Response, next:NextFunction){

        try {
            const {link, title, content,tags, typeId} = req.body;
            const userId = req.userId;
            

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }
            const type_name = await TypeModel.findById(typeId) || await DefaultTypeModel.findById(typeId);

            const parseData = Validatecontent.safeParse({ title,content, link ,typeId , typename:type_name?.typename, tags, userId });

            if (!parseData.success) {
                return res.status(400).json({
                success: false,
                message: parseData.error.issues[0].message,
                });
            }

            
            const AddedContent = await ContentModel.create({link, title, userId, content, tags, type: typeId, typename: type_name?.typename});

            return res.status(201).json({
                success: true,
                message: "content added successfully",
                content : AddedContent
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while adding content",
            });
        }
    }


    async findContentById(req:AuthRequest, res:Response, next:NextFunction){
        try {
            
            const userId = req.userId;
            const {contentId} = req.params;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const result = objectIdSchema.safeParse({contentId});
            if (!result.success) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid content selected",
                });
            }

            const content = await ContentModel.findById(contentId);
            return res.status(200).json({
                success: true,
                content
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while finding content",
            });            
        }
    }

    async deleteContent(req:AuthRequest, res:Response, next:NextFunction){
        try {
            const userId = req.userId;
            const {contentId} = req.params;

            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                });
            }

            const result = objectIdSchema.safeParse({contentId});
            if (!result.success) {
                return res.status(400).json({ 
                    success: false,
                    message: "Content doesn't exists",
                });
            }

            const deletedConent = await ContentModel.deleteOne({_id : contentId, userId});
            if(deletedConent.deletedCount == 0){
                return res.status(401).json({
                    success: false,
                    message: "content doesn't exists",
                });
            }
            
            return res.status(201).json({
                success: true,
                message: "content deleted successfully",
            });


        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Internal server error while deleting content",
            }); 
        }
    }
}