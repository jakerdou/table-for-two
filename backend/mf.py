import numpy as np

class MF:
    def __init__(self, train_mat, test_mat, latent=5, lr=0.01, reg=0.01):
        self.train_mat = train_mat  # the training rating matrix of size (#user, #movie)
        self.test_mat = test_mat  # the training rating matrix of size (#user, #movie)

        self.latent = latent  # the latent dimension
        self.lr = lr  # learning rate
        self.reg = reg  # regularization weight, i.e., the lambda in the objective function

        self.num_user, self.num_movie = train_mat.shape

        self.sample_user, self.sample_movie = self.train_mat.nonzero()  # get the user-movie paris having ratings in train_mat
        self.num_sample = len(self.sample_user)  # the number of user-movie pairs having ratings in train_mat

        self.train_indicator_mat = 1.0 * (train_mat > 0)  # binary matrix to indicate whether s user-movie pair has rating or not in train_mat
        self.test_indicator_mat = 1.0 * (test_mat > 0)  # binary matrix to indicate whether s user-movie pair has rating or not in test_mat

        self.P = np.random.random((self.num_user, self.latent))  # latent factors for users, size (#user, self.latent), randomly initialized
        self.Q = np.random.random((self.num_movie, self.latent))  # latent factors for users, size (#movie, self.latent), randomly initialized

    def train(self, epoch=20, verbose=True):
        """
        Goal: Write your code to train your matrix factorization model for epoch iterations in this function
        Input: epoch -- the number of training epoch
        Output: epoch_loss_list -- a list recording the training loss for each epoch
                epoch_test_RMSE_list -- a list recording the testing RMSE after each training epoch
        """
        start = time.time()

        rand_indices = np.arange(self.sample_user.shape[0])
        np.random.shuffle(rand_indices)
        sample_user_rand = self.sample_user[rand_indices]
        sample_movie_rand = self.sample_movie[rand_indices]

        epoch_loss_list = []
        epoch_test_RMSE_list = []
        for ep in range(epoch):
            """
            Write your code here to implement the training process for one epoch,
            and at the end of each epoch, print out the epoch number, the training loss after this epoch,
            and the test RMSE after this epoch
            """
            loss = 0
            for user_ind, movie_ind in zip(sample_user_rand, sample_movie_rand):
                pu = self.P[user_ind]
                qi = self.Q[movie_ind]

                first_term = int(np.matmul(pu, np.transpose(qi)) - self.train_mat[user_ind][movie_ind])

                pu = pu - self.lr * (2 * first_term * qi + 2 * self.reg * pu)
                self.P[user_ind] = pu
                qi = qi - self.lr * (2 * first_term * pu + 2 * self.reg * qi)
                self.Q[movie_ind] = qi

                loss += first_term ** 2

            loss += self.reg * (np.sum(self.P ** 2) + np.sum(self.Q ** 2))
            epoch_loss_list.append(loss)

            indicator_mat = (self.test_mat > 0).astype(float)
            prediction_mat = self.predict()
            rmse = (np.sum(((prediction_mat - self.test_mat) * indicator_mat) ** 2) / np.sum(indicator_mat)) ** 0.5
            epoch_test_RMSE_list.append(rmse)

            if verbose:
                print('Done with epoch ' + str(ep + 1) + '; Time taken: ' + str(time.time() - start) + ' s; Loss: ' + str(loss) + '; RMSE: ' + str(rmse))

            """
            End of your code for this function
            """
        return epoch_loss_list, epoch_test_RMSE_list

    def add_new_user(self, ratings):
        ratings = np.array([ratings])

        new_lf = np.matmul(ratings, mf.Q)

        self.P = np.vstack([self.P, new_lf])

    def predict(self):
        prediction_mat = np.matmul(self.P, self.Q.T)
        return prediction_mat
