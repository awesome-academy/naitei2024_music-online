import { AppDataSource } from '@src/config/data-source';
import { Album } from '../entities/Album.entity';
import { getAuthorById } from '@src/services/Author.service';
import { t } from 'i18next';

const albumRepository = AppDataSource.getRepository(Album);
export const createAlbum = async (data: {
  title: string;
  imageUrl: string;
  releaseDate: Date;
  authorId?: number;
}) => {
  try {
    const album = new Album();
    album.title = data.title;
    album.imageUrl = data.imageUrl;
    album.releaseDate = data.releaseDate;
    if (data.authorId) {
      const author = await getAuthorById(data.authorId, t);
      if (!author) {
        throw new Error(t('error.authorNotFound'));
      }
      album.author = author;
    }
    await albumRepository.save(album);
    return true;
  } catch (error) {
    return false;
  }
};
export const getAlbums = async () => {
  return albumRepository.find({
    relations: ['author'],
  });
};

export const getAlbumById = async (id: number) => {
  const album = await albumRepository.findOne({
    where: { id },
    relations: ['songs', 'author'],
  });
  return album;
};

export const updateAlbum = async (id: number, dataAlbum: Partial<Album>) => {
  try {
    const album = await albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      return false;
    }
    Object.assign(album, dataAlbum);
    await album.save();
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAlbum = async (id: number) => {
  try {
    const album = await albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      return false;
    }
    await albumRepository.remove(album);
    return true;
  } catch (error) {
    return false;
  }
};